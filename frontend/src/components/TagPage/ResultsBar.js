import React from "react";
import { useHistory } from "react-router-dom";

export default function ResultsBar({ search, displayed, results }) {
  const history = useHistory();

  return (
    <>
      <div className="results-container">
        <div className="results-bar">
          <div className="search-name">
            Showing results for <p>{search}</p>:
          </div>
          <div className="results-count">
            1-{displayed} of {results}
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
