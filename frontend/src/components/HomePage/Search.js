import React from "react";

export default function Search() {
  function changeBlue(e) {
    e.target.firstChild.style.color = "rgb(22, 142, 197)";
    e.target.style.backgroundColor = "white";
  }
  function changeWhite(e) {
    e.target.firstChild.style.color = "white";
    e.target.style.backgroundColor = "rgb(22, 142, 197)";
  }
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
                placeholder="San Clemente"
              ></input>
            </div>
            <div>
              <label className="search state" />
              STATE
              <input
                className="search state"
                name="search"
                placeholder="California"
              ></input>
            </div>
            <div>
              <label className="search country" />
              COUNTRY
              <input
                className="search country"
                name="search"
                placeholder="United States"
              ></input>
            </div>
          </div>
          <button
            onMouseEnter={changeBlue}
            onMouseLeave={changeWhite}
            type="submit"
            className="search"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <img
        className="search"
        src="https://coastal-camper.s3.amazonaws.com/search-background.jpg"
      ></img>
    </div>
  );
}
