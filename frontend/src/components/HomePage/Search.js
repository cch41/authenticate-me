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
          <div>
            <p className="search">WHERE TO?</p>
            <input
              className="search"
              name="search"
              placeholder='Try "Honolulu" or "Nazare"...'
            ></input>
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
