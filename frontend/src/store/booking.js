import { csrfFetch } from "./csrf";

const GET_PAST_BOOKING = "bookings/addPastBooking";
const GET_UPCOMING_BOOKING = "bookings/addUpcomingBooking";

// thunks

const addPastBooking = (type, payload) => ({
  type,
  payload,
});

const addUpcomingBooking = (type, payload) => ({
  type,
  payload,
});

export const createBooking = (booking) => async (dispatch) => {
  const { guests, checkIn, checkOut, userId, locationId } = booking;
  const res = await csrfFetch("/api/bookings", {
    method: "POST",
    body: JSON.stringify({ guests, checkIn, checkOut, userId, locationId }),
  });
  const data = await res.json();
  return data.message;
};

export const getBookings = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${userId}`);
  const data = await res.json();
  dispatch(addPastBooking(GET_PAST_BOOKING, data.past));
  dispatch(addUpcomingBooking(GET_UPCOMING_BOOKING, data.upcoming));
  return data.bookings;
};

export const cancelBooking = (bookingId) => async (dispatch) => {
  await csrfFetch(`/api/bookings/${bookingId}`, { method: "DELETE" });
  return;
};

export const editBooking = (bookingData) => async (dispatch) => {
  const { bookingId, guests, checkIn, checkOut, userId, locationId } =
    bookingData;

  await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PATCH",
    body: JSON.stringify({ guests, checkIn, checkOut, userId, locationId }),
  });

  return;
};

const bookingsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_PAST_BOOKING: {
      newState = Object.assign({}, state);
      newState.past = action.payload;
      return newState;
    }
    case GET_UPCOMING_BOOKING: {
      newState = Object.assign({}, state);
      newState.upcoming = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default bookingsReducer;
