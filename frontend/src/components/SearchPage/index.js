import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Location from "../TagPage/Location";
import ResultsBar from "../TagPage/ResultsBar";
import { searchLocations } from "../../store/location";
import Map from "../GoogleMaps";

const SearchPage = () => {
  const { query } = useParams();
  const [locations, setLocations] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(query);

  function formatQuery(query) {
    const [city, state, country] = query.split(",");
    let formatted = "";
    console.log(city, state, country);

    if (city && state) formatted += `${city}, ${state}`;
    else if (city) formatted += `${city}`;
    else if (state) formatted += `${state}`;

    if (country) formatted += ` (${country})`;
    return formatted;
  }
  const formattedQuery = formatQuery(query);

  useEffect(() => {
    async function getQueryLocations() {
      const res = await fetch(`/api/locations/query/${query}`);
      const data = await res.json();
      setLocations(data.locations);
      setLoaded(true);
      return;
    }
    getQueryLocations();
  }, []);

  return (
    <div className="tag-page-container">
      <ResultsBar search={formattedQuery} results={locations.length} />
      <div className="tag-page-content">
        {loaded && !locations.length && <p>No results found.</p>}
        <div className="tag-page-locations">
          {locations.map((location, i) => (
            <Location key={i} location={location} />
          ))}
        </div>
        <div className="tag-page-map">
          <Map locations={locations} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
