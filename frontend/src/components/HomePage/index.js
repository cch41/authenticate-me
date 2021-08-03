import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
import Tag from "./Tag";
import Search from "./Search";
import City from "./City";

const HomePage = () => {
  const [tags, setTags] = useState([]);
  const [locations, setLocations] = useState([]);
  const history = useHistory([]);

  useEffect(() => {
    async function getLocations() {
      const tagRes = await fetch("/api/tags");
      const tagData = await tagRes.json();
      setTags(tagData.tags);

      const locRes = await fetch("/api/locations");
      const locData = await locRes.json();
      setLocations(locData.locations);

      return;
    }
    getLocations();
  }, []);

  return (
    <div className="home-page">
      <div className="home-page-message">
        <h1>Find yourself outside.</h1>
        <h3>
          Discover and book tent camping, RV, parks, <br></br> cabins, and
          glamping near surfing locales.
        </h3>
      </div>
      <Search />
      <div className="tags-outer-container">
        <h3>Discover new places</h3>
        <div className="tags-inner-container">
          {tags.map((tag, i) => {
            if (i < 3) return <Tag key={i} i={i} tag={tag} />;
          })}
        </div>
      </div>
      <div className="tags-outer-container">
        <h3>Find your wave comfort</h3>
        <div className="tags-inner-container">
          {tags.map((tag, i) => {
            if (i >= 3) return <Tag key={i} i={i} tag={tag} />;
          })}
        </div>
      </div>
      <div className="decoration-outer-container stars">
        <div>
          <div className="stars">Stargazing this season</div>
          <p className="stars">
            Don't miss your chance to see shooting stars or Saturn's famous
            rings.
          </p>
          <button className="stars" onClick={() => history.push("/search/,,")}>
            Plan your night out
          </button>
        </div>
      </div>
      <div className="city-outer-container">
        <h3>Find the perfect locale</h3>
        <div className="city-inner-container">
          {locations.map((location, i) => {
            return <City key={i} location={location} />;
          })}
        </div>
      </div>
      <div className="decoration-outer-container">
        <h3 className="list">Beaches, parks, and campgrounds</h3>
        <div className="decoration-inner-container">
          {locations.map((location, i) => (
            <div
              className="location-name home"
              onClick={() => history.push(`/locations/${location.id}`)}
            >
              {location.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
