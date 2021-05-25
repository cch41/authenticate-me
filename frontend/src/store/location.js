import { csrfFetch } from './csrf';

const ADD_LOCATION = 'locations/addLocation';

const addLocation = (location) => (
    { type: ADD_LOCATION, location }
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
    dispatch(addLocation(data))
    return data
};

const locationsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_LOCATION: {
            return state
        }
        default:
            return state
    }
}

export default locationsReducer;
