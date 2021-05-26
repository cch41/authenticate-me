import { csrfFetch } from './csrf';

const ADD_BOOKING = 'bookings/addBooking';

export const createBooking = (booking) => async (dispatch) =>  {
    // create a booking
    const { guests, checkIn, checkOut, userId, locationId } = booking;
    const res = await csrfFetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({ guests, checkIn, checkOut, userId, locationId })
    })
    const data = await res.json();
    return data.message
};

const bookingsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_BOOKING: {
            return state
        }
        default:
            return state
    }
}

export default bookingsReducer;
