import { useState, useEffect } from "react";
import "./LocationPage.css";
import addDays from "date-fns/addDays";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../store/booking";

const BookingForm = ({ locationId, price }) => {
  const getMinMaxDate = () => {
    let [month, day, year] = new Date().toLocaleDateString("en-US").split("/");
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    const minDate = `${year}-${month}-${day}`;
    const maxYear = Number(year) + 1;
    const maxDate = `${maxYear}-${month}-${day}`;
    return [minDate, maxDate];
  };

  const dateFormat = (date) => {
    let year = date.getFullYear();
    let month = Number(date.getMonth());
    let day = Number(date.getDate());

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  };

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const [guests, setGuests] = useState(1);
  const [minDate, maxDate] = getMinMaxDate();
  const [checkIn, setCheckIn] = useState(minDate);
  const [checkOutMin, setCheckOutMin] = useState(minDate);
  const [checkOutMax, setCheckOutMax] = useState(maxDate);
  const [checkOut, setCheckOut] = useState(checkOutMin);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // recalculate the min
    const checkOutMinCalc = () => {
      // add 1 day to the check in day
      let [year, month, day] = checkIn.split("-");
      const res = addDays(new Date(year, month, day), 1);
      return res;
    };
    const newMinDate = checkOutMinCalc();
    const formattedMinDate = dateFormat(newMinDate);
    setCheckOutMin(formattedMinDate);

    // recalculate the max
    const checkOutMaxCalc = () => {
      // calc 10 days from the check in day
      let [year, month, day] = checkIn.split("-");
      const res = addDays(new Date(year, month, day), 10);
      return res;
    };
    const newMaxDate = checkOutMaxCalc();
    const formattedMaxDate = dateFormat(newMaxDate);
    setCheckOutMax(formattedMaxDate);
  }, [checkIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = { guests, checkIn, checkOut, userId, locationId };

    dispatch(createBooking(formValues))
      .then(() => window.alert("Booking confirmed"))
      .catch(() => setMessage("Submission failed, please try again"));
  };

  return (
    <div className="booking-form">
      <div className="price-container">
        <div className="price">${price}</div>
        <div>per night</div>
      </div>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="dates">
          <div>
            <label htmlFor="check-in">Check in</label>
            <input
              type="date"
              value={checkIn}
              placeholder="select date"
              onChange={(e) => setCheckIn(e.target.value)}
              min={minDate}
              max={maxDate}
            ></input>
          </div>
          <div>
            <label htmlFor="check-out">Check out</label>
            <input
              type="date"
              value={checkOut}
              placeholder="select date"
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkOutMin}
              max={checkOutMax}
            ></input>
          </div>
        </div>
        <div className="guests">
          <label htmlFor="guests">Guests</label>
          <select
            className="guests"
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value={1}>1 guest</option>
            <option value={2}>2 guests</option>
            <option value={3}>3 guests</option>
            <option value={4}>4 guests</option>
            <option value={5}>5 guests</option>
            <option value={6}>6 guests</option>
            <option value={7}>7 guests</option>
            <option value={8}>8 guests</option>
            <option value={9}>9 guests</option>
            <option value={10}>10 guests</option>
          </select>
        </div>
        <div className="submit">
          <button className="book" type="submit">
            Instant book
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
