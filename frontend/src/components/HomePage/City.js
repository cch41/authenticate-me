import React from "react";
import { useHistory } from "react-router-dom";

export default function City({ location }) {
  const history = useHistory();

  return (
    <div>
      <div
        className="home-picture-city"
        onClick={() => history.push(`/locations/${location.id}`)}
        style={{ backgroundImage: `url(${location.imageUrl})` }}
      ></div>
      <div className="city-name">
        <div className="city">{location.city}</div>
        <div className="state">{location.state}</div>
      </div>
    </div>
  );
}
