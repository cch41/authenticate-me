import { csrfFetch } from "./csrf";

const SET_LOCATION = "locations/setLocation";
const SET_WEATHER = "locations/setWeather";

export const setLocation = (location) => ({ type: SET_LOCATION, location });
export const setWeather = (weather) => ({ type: SET_WEATHER, weather });

const createLocationForm = (location) => {
  const {
    userId,
    name,
    price,
    tags,
    image,
    address,
    unit,
    city,
    state,
    country,
    zipcode,
    description,
  } = location;

  const formData = new FormData();
  formData.append("image", image);
  formData.append("userId", userId);
  formData.append("name", name);
  formData.append("tags", tags);
  formData.append("price", price);
  formData.append("address", address);
  if (unit) {
    formData.append("unit", unit);
  }
  formData.append("city", city);
  formData.append("state", state);
  formData.append("country", country);
  formData.append("zipcode", zipcode);
  formData.append("description", description);

  return formData;
};

export const createLocation = (location) => async (dispatch) => {
  const formData = createLocationForm(location);

  const res = await csrfFetch(`/api/locations/`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();
  dispatch(setLocation(data));
  return data;
};

export const getLocation = (locationId) => async (dispatch) => {
  const res = await fetch(`/api/locations/${locationId}`);
  const data = await res.json();
  console.log(data.weather);
  await dispatch(setLocation(data.location));
  await dispatch(setWeather(data.weather));
  return;
};

export const getHostLocations = (userId) => async (dispatch) => {
  const res = await fetch(`/api/locations/users/${userId}`);
  const data = await res.json();
  return data.locations;
};

export const editLocation = (locationData) => async (dispatch) => {
  const { locationId } = locationData;
  const formData = createLocationForm(locationData);

  await csrfFetch(`/api/locations/${locationId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  return;
};

export const deleteLocation = (locationId) => async (dispatch) => {
  await csrfFetch(`/api/locations/${locationId}`, { method: "DELETE" });
  return;
};

export const addReview =
  (content, userId, locationId, recommends) => async (dispatch) => {
    await csrfFetch(`/api/locations/${locationId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, userId, recommends }),
    });
    return;
  };

export const searchLocations = (query) => async (dispatch) => {
  const res = await csrfFetch(`/api/locations/query/${query}`);
  const data = await res.json();
  return data;
};

export const locationsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_LOCATION: {
      return { ...state, currentLocation: action.location };
    }
    case SET_WEATHER: {
      return { ...state, weather: action.weather };
    }
    default:
      return state;
  }
};

export default locationsReducer;
