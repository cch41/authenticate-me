import { csrfFetch } from './csrf';

const ADD_BOOKING = 'bookings/addBooking';

export const createBooking = (booking) => async (dispatch) =>  {
    const { guests, checkIn, checkOut, userId, locationId } = booking;
    const res = await csrfFetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({ guests, checkIn, checkOut, userId, locationId })
    })
    const data = await res.json();
    return data.message
};

export const getBookings = (userId) => async (dispatch) =>  {
    const res = await csrfFetch(`/api/bookings/${userId}`);
    const data = await res.json();
    return data.bookings
};

export const cancelBooking = (bookingId) => async (dispatch) => {
    await csrfFetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
    return
}

export const editBooking = (bookingData) => async (dispatch) => {
    const { bookingId, guests, checkIn, checkOut, userId, locationId } = bookingData;

    await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ guests, checkIn, checkOut, userId, locationId })
    });

    return
}

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
