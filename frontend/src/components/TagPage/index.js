import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import Location from "./Location";
import Map from "../GoogleMaps";
import ResultsBar from "./ResultsBar";

const TagPage = () => {
  const { tagId } = useParams();
  const [tag, setTag] = useState([]);
  const [locations, setLocations] = useState([]);
  const [displayed, setDisplayed] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    async function getTagData() {
      const res = await fetch(`/api/tags/${tagId}`);
      const data = await res.json();
      setTag(data.tags);
      setLocations(data.tags.Locations);
      console.log(data.tags.Locations[0]);
      setLoaded(true);
      return;
    }
    getTagData();
  }, [tagId]);

  return (
    <div className="tag-page-container">
      <ResultsBar
        search={tag.name}
        displayed={displayed}
        results={locations.length}
      />
      <div className="tag-page-content">
        {loaded && !locations.length && <p>No results found.</p>}
        <div className="tag-page-locations">
          {locations.map((location, i) => (
            <Location key={i} location={location} user={user} />
          ))}
        </div>
        <div className="tag-page-map">
          <Map locations={locations} />
        </div>
      </div>
      <LoginFormModal show={user ? false : true} />
    </div>
  );
};

export default TagPage;
