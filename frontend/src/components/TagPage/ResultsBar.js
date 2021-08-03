import React from "react";
import { useHistory } from "react-router-dom";

export default function ResultsBar({ search, results }) {
  const history = useHistory();

  return (
    <>
      <div className="results-container">
        <div className="results-bar">
          <div className="search-name">
            Showing results for <p>{search}</p>:
          </div>
          <div className="results-count">
            {results ? 1 : 0}-{results} of {results}
          </div>
        </div>
        <div style={{ width: "400px" }}></div>
      </div>
      <div className="results-container">
        <p onClick={() => history.push("/")}>{"< "}Back</p>
        <div style={{ width: "900px" }}></div>
      </div>
    </>
  );
}
