import React from "react";
import { useHistory } from "react-router-dom";

export default function LocationDetails({ booking, i }) {
  const history = useHistory();

  return (
    <>
      <div className="booking-picture">
        <img
          className="booking-picture"
          alt="booking location"
          src={booking.Location.imageUrl}
          onClick={() => history.push(`/locations/${booking.Location.id}`)}
        />
      </div>
      <div className="header location">
        Location
        <p
          className="location-name"
          onClick={() => history.push(`/locations/${booking.Location.id}`)}
        >
          {booking.Location.name}
        </p>
      </div>
      <div className="header">
        Price
        <p>{`$${booking.Location.price}/night`}</p>
      </div>
      <div className="header">
        Check in
        <p>{booking.checkIn}</p>
      </div>
      <div className="header">
        Check out
        <p>{booking.checkOut}</p>
      </div>
      <div className="header">
        Guests
        <p className={booking.guests === 1 ? "guests" : "--hidden"}>
          {booking.guests} guest
        </p>
        <p className={booking.guests !== 1 ? "guests" : "--hidden"}>
          {booking.guests} guests
        </p>
      </div>
    </>
  );
}
