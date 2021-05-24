import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './HostForm.css';

// create host form (essentially creating a location)
    // add location adding
    // handle error validation

const HostForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);
    if (!user) return <Redirect to='/signup' />;



    const onSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            name,
            price,
            description,
            userId: user.id
        };
        console.log(formValues);
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
            <button type="submit" disabled={false}>HOST</button>
        </form>
    );
}

export default HostForm;
