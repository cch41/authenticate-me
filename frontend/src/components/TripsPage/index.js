import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBookings, cancelBooking } from "../../store/booking";
import "../AccountPage/AccountPage.css";
import LocationDetails from "./LocationDetails";
import BookingFormModal from "../BookingFormModal";
import ReviewFormModal from "../ReviewFormModal";
import { useSelector } from "react-redux";
import "./Bookings.css";

const Bookings = () => {
  const userId = useSelector((state) => state.session.user.id);
  const upcomingBookings = useSelector((state) => state.bookings.upcoming);
  const pastBookings = useSelector((state) => state.bookings.past);
  const dispatch = useDispatch();
  const [updates, setUpdates] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      await dispatch(getBookings(userId));
      setLoaded(true);
    })();
  }, [updates, dispatch, userId]);

  const handleCancel = (e) => {
    const bookingId = e.target.value;
    return dispatch(cancelBooking(bookingId)).then(() =>
      setUpdates(updates + 1)
    );
  };

  const handleReview = (e) => {
    const bookingId = e.target.value;
    return dispatch(cancelBooking(bookingId)).then(() =>
      setUpdates(updates + 1)
    );
  };

  return (
    loaded && (
      <div className="bookings-container">
        <h4>Upcoming Bookings</h4>
        {upcomingBookings.map((booking, i) => {
          return (
            <div key={i} className="one-booking-container">
              <LocationDetails key={i} booking={booking} i={i} />
              <BookingFormModal
                bookingId={booking.id}
                locationId={booking.locationId}
              />
              <button value={booking.id} onClick={handleCancel}>
                CANCEL BOOKING
              </button>
            </div>
          );
        })}
        <h4>Previous Bookings</h4>
        {pastBookings.map((booking, i) => {
          return (
            <div key={i} className="one-booking-container">
              <LocationDetails key={i} booking={booking} i={i} />
              <ReviewFormModal locationId={booking.Location.id} />
            </div>
          );
        })}
      </div>
    )
  );
};

export default Bookings;
