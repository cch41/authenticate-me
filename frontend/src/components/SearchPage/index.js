import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Location from "../TagPage/Location";
import { searchLocations } from "../../store/location";
import Map from "../GoogleMaps";

const SearchPage = () => {
  const { query } = useParams();
  const [locations, setLocations] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

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
      <h1>{locations.length} results</h1>
      <p onClick={() => history.push("/")}>{"< "}Back</p>
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
