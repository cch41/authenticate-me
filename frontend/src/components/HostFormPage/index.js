import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './HostForm.css';
import { Multiselect } from 'multiselect-react-dropdown'
import { createLocation } from '../../store/location';
import { useHistory } from 'react-router-dom';
import { editLocation } from '../../store/location';


const HostForm = ({ location }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [address, setAddress] = useState('');
    const [unit, setUnit] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [errors, setErrors] = useState([]);
    const [isNew, setIsNew] = useState(true);
    const [message, setMessage] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };


    useEffect(() => {
        const checkIfUpdate = () => {
            if (location) {
                setIsNew(false);
                if (location.name) {
                    setName(location.name)
                }
                if (location.price) {
                    setPrice(location.price)
                }
                if (location.description) {
                    setDescription(location.description)
                }
                if (location.address) {
                    setAddress(location.address)
                }
                if (location.unit) {
                    setUnit(location.unit)
                }
                if (location.city) {
                    setCity(location.city)
                }
                if (location.state) {
                    setState(location.state)
                }
                if (location.zipcode) {
                    setZipcode(location.zipcode)
                }
                if (location.country) {
                    setCountry(location.country)
                }
            } else return
        }
        checkIfUpdate();
    }, [location]);

    useEffect(() => {
        async function getTags() {
            const res = await fetch('/api/tags');
            const data = await res.json();
            setTagOptions(data.tags);
            return
        }
        getTags();
    }, []);

    const user = useSelector(state => state.session.user);
    if (!user) return <Redirect to='/signup' />;

    const onSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            name,
            price,
            description,
            image,
            tags,
            address,
            unit,
            city,
            state,
            country,
            zipcode,
            userId: user.id
        };

        if (isNew) {
            return dispatch(createLocation(formValues))
                .then(() => history.push('/'))
                .then(() => window.alert('Host location submitted successfully'))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors([...errors, data.errors]);
                })
        } else {
            return dispatch(editLocation({ ...formValues, locationId: location.id }))
            .then(() => setMessage('Location updated successfully!'))
            .then(() => setErrors([]))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors([...errors, data.errors]);
                })
        }

    }

    return (
        <form onSubmit={onSubmit}>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
            {message && <div className="booking-submission-message">{message}</div>}
            <p className="note"><em>* = required field</em></p>

            <label htmlFor="name">Name*</label>
            <input name="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            ></input>

            <label htmlFor="tags">Tags</label>
            <Multiselect options={tagOptions} displayValue="name"
                onSelect={(array, selectedTag) => setTags([...tags, selectedTag.id])}
                onRemove={(array, selectedTag) => {
                    const newArray = tags.filter(tagId => tagId !== selectedTag.id)
                    setTags(newArray);
                }} />
            <label htmlFor="price">Price / night*</label>
            <input name="price"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
            ></input>

            <label htmlFor="description">Description*</label>
            <textarea name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
            ></textarea>
            <label htmlFor="image">Image*</label>
            <input name="image" type="file" onChange={updateFile} />

            <label className="full-field">
                <span className="form-label">Address*</span>
                <input
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    autoComplete="off"
                />
            </label>
            <label htmlFor="form-label" className="full-field">
                <span className="form-label">Apartment, unit, suite, or floor #</span>
                <input id="address2" name="address2" value={unit} onChange={(e) => setUnit(e.target.value)} />
            </label>
            <label htmlFor="form-label" className="full-field">
                <span className="form-label">City*</span>
                <input id="locality" name="locality" value={city} onChange={(e) => setCity(e.target.value)} required />
            </label>
            <label className="slim-field-left">
                <span className="form-label">State/Province*</span>
                <input id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} required />
            </label>
            <label className="slim-field-right" htmlFor="zip_code">
                <span className="form-label">ZIP Code*</span>
                <input id="zipcode" name="zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />
            </label>
            <label className="full-field">
                <span className="form-label">Country/Region*</span>
                <input id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </label>
            <button type="submit">HOST</button>
        </form>
    );
}

export default HostForm;
