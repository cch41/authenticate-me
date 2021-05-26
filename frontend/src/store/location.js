import { csrfFetch } from './csrf';

const SET_LOCATION = 'locations/setLocation';

export const setLocation = (location) => (
    { type: SET_LOCATION, location }
);

export const createLocation = (location) => async (dispatch) => {
    const { userId, name, price, tags, image, address, unit, city, state, country, zipcode, description } = location;

    const formData = new FormData();
    formData.append("image", image)
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

    const res = await csrfFetch(`/api/locations/`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const data = await res.json();
    dispatch(setLocation(data))
    return data
};

export const getLocation = (locationId) => async (dispatch) => {
    const res = await fetch(`/api/locations/${locationId}`);
    const data = await res.json();
    await dispatch(setLocation(data.location));
    return data.location
}

const locationsReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_LOCATION: {
            return { ...state, currentLocation: action.location }
        }
        default:
            return state
    }
}

export default locationsReducer;
