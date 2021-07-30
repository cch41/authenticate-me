import { useState, useEffect } from "react";
import "./HomePage.css";
import Tag from "./Tag";
import Search from "./Search";

const HomePage = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function getTags() {
      const res = await fetch("/api/tags");
      const data = await res.json();
      setTags(data.tags);
      return;
    }
    getTags();
  }, []);

  return (
    <div className="home-page">
      <div className="home-page-message">
        <h1>Find yourself outside.</h1>
        <h3>
          Discover and book tent camping, RV <br></br> parks, cabins, and
          glamping near surfing locales.
        </h3>
      </div>
      <Search />
      <div className="tags-outer-container">
        <h3>Find your next getaway</h3>
        <div className="tags-inner-container">
          {tags.map((tag, i) => (
            <Tag key={i} i={i} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
