import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './HostForm.css';
import { createLocation } from '../../store/location';

// create host form (essentially creating a location)
// add aws3
// add address handling
// handle error validation
// add redux

const HostForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    if (!user) return <Redirect to='/signup' />;


    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            name,
            price,
            description,
            userId: user.id
        };
        console.log(formValues);
        // return
        // POST to /api/locations
        // dispatch(createLocation(formValues))
        //     .then(() => {
        //         window.alert('New location added successfully');
        //         res.redirect('/')
        //     })
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) {
        //             newErrors = data.errors;
        //             setErrors(newErrors);
        //         }
        //     });
    }

    return (
        <form onSubmit={onSubmit}>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
            <label htmlFor="name">Name</label>
            <input name="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            ></input>
            <label htmlFor="price">Price / night</label>
            <input name="price"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
            ></input>
            <label htmlFor="description">Description</label>
            <textarea name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
            ></textarea>
            <label htmlFor="image">Image</label>
            <input name="image" type="file" onChange={updateFile} required />
            <button type="submit" disabled={false}>HOST</button>
        </form>
    );
}

export default HostForm;
