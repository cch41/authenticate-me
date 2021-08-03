import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getHostLocations, deleteLocation } from "../../store/location";
import HostFormModal from "../HostFormModal";
import "../AccountPage/AccountPage.css";
import "./HostingPage.css";

export default function HostingsPage() {
  const userId = useSelector((state) => state.session.user.id);
  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();
  const [updates, setUpdates] = useState(0);
  const history = useHistory();

  useEffect(() => {
    dispatch(getHostLocations(userId)).then((res) => setLocations(res));
  }, [updates, userId, dispatch]);

  const handleCancel = (e) => {
    const locationId = e.target.value;
    return dispatch(deleteLocation(locationId)).then(() =>
      setUpdates(updates + 1)
    );
  };

  return (
    <div className="locations-page">
      <div className="locations-container">
        <div className="add-location-container">
          <div onClick={() => history.push("/host")} className="add-location">
            + Add new location to host
          </div>
        </div>
        {locations.map((location, i) => {
          return (
            <div key={i} className="one-location-container">
              <img
                className="hosting-picture"
                alt="hosted location"
                src={location.imageUrl}
                onClick={() => history.push(`/locations/${location.id}`)}
              />
              <div className="header name">
                Name
                <p onClick={() => history.push(`/locations/${location.id}`)}>
                  {location.name}
                </p>
              </div>
              <div className="header price">
                Price
                <p>${location.price}/night</p>
              </div>
              <div className="header address">
                Address
                <p>
                  {location.address} {location.unit}
                </p>
                <p>
                  {location.city}, {location.state}
                </p>
                <p>{location.zipcode}</p>
                <p>{location.country}</p>
              </div>
              <div className="header description">
                Description
                <p>{location.description}</p>
              </div>
              <HostFormModal location={location} />
              <button
                className="cancel"
                value={location.id}
                onClick={handleCancel}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
