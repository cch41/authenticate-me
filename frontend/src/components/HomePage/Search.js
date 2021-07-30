import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Search() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    history.push(`/search/${city},${state},${country}`);
  };

  return (
    <div className="search">
      <div className="search form-wrapper">
        <form className="search">
          <div className="inputs-container">
            <div>
              <label className="search city" />
              CITY
              <input
                className="search city"
                name="search"
                placeholder="Myrtle Beach"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="search state" />
              STATE
              <input
                className="search state"
                name="search"
                placeholder="South Carolina"
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="search country" />
              COUNTRY
              <input
                className="search country"
                name="search"
                placeholder="United States"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </div>
          </div>
          <button type="submit" className="search" onClick={handleSubmit}>
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <img
        className="search"
        src="https://coastal-camper.s3.amazonaws.com/search.png"
      ></img>
    </div>
  );
}
