import { useState, useEffect } from 'react';
import './LocationPage.css';
import addDays from 'date-fns/addDays';

const BookingForm = ({ location }) => {
    const getMinMaxDate = () => {
        let [month, day, year] = new Date().toLocaleDateString("en-US").split("/");
        if (month < 10) {
            month = `0${month}`
        }
        if (day < 10) {
            day = `0${month}`
        }
        const minDate = `${year}-${month}-${day}`;
        const maxYear = Number(year) + 1;
        const maxDate = `${maxYear}-${month}-${day}`;
        return [minDate, maxDate]
    }

    const checkOutMinCalc = () => {
        // add 1 day to the check in day
        let [year, month, day] = checkIn.split('-');
        const res = addDays(new Date(year, month, day), 1);
        return res
    }

    const checkOutMaxCalc = () => {
        // calc 10 days from the check in day
        let [year, month, day] = checkIn.split('-');
        const res = addDays(new Date(year, month, day), 10);
        return res
    }

    const [guests, setGuests] = useState(1);
    const [minDate, maxDate] = getMinMaxDate();
    const [checkIn, setCheckIn] = useState(minDate);
    const [checkOutMin, setCheckOutMin] = useState(checkOutMinCalc());
    const [checkOutMax, setCheckOutMax] = useState(checkOutMaxCalc());
    const [checkOut, setCheckOut] = useState(checkOutMin);

    useEffect(() => {
        console.log(checkOutMax)
        setCheckOutMin(checkOutMinCalc())
        setCheckOutMax(checkOutMaxCalc())
        console.log(checkOutMax)
    }, [checkIn])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted');
    }

    return (
        <>
            <form className="booking-form" onSubmit={handleSubmit}>
                <label htmlFor="check-in">Check in</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} min={minDate} max={maxDate}></input>
                <label htmlFor="check-out">Check out</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} min={checkOutMin} max={checkOutMax}></input>
                <label htmlFor="guests">Guests</label>
                <select className="guests" onChange={(e) => setGuests(e.target.value)}>
                    <option value={1} >1 guest</option>
                    <option value={2} >2 guests</option>
                    <option value={3} >3 guests</option>
                    <option value={4} >4 guests</option>
                    <option value={5} >5 guests</option>
                    <option value={6} >6 guests</option>
                    <option value={7} >7 guests</option>
                    <option value={8} >8 guests</option>
                    <option value={9} >9 guests</option>
                    <option value={10} >10 guests</option>
                </select>
                <button className="book-button" type="submit">Book</button>
            </form>
        </>
    );
}

export default BookingForm;
