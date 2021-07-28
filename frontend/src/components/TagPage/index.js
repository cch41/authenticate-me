import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Location from "./Location";
import Map from "../GoogleMaps";

const TagPage = () => {
  const { tagId } = useParams();
  const [tag, setTag] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getTagData() {
      const res = await fetch(`/api/tags/${tagId}`);
      const data = await res.json();
      setTag(data.tags);
      setLocations(data.tags.Locations);
      setLoaded(true);
      return;
    }
    getTagData();
  }, [tagId]);

  return (
    <div className="tag-page-container">
      <h1>{tag.name}</h1>
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

export default TagPage;
