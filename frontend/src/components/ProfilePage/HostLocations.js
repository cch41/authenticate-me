import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getHostLocations, deleteLocation } from '../../store/location';
import HostFormModal from '../HostFormModal';
import './ProfilePage.css';

const HostLocations = ({ userId }) => {
    const [locations, setLocations] = useState([]);
    const dispatch = useDispatch();
    const [updates, setUpdates] = useState(0);

    useEffect(() => {
        dispatch(getHostLocations(userId)).then((res) => setLocations(res));
    }, [updates]);

    const handleCancel = (e) => {
        const locationId = e.target.value;
        return dispatch(deleteLocation(locationId))
            .then(() => setUpdates(updates + 1));
    }
    // display each booking location (name only to start) with an 'edit' and 'cancel' button next to them
    return (
        <>
            {locations.map((location, i) => {
                return <div key={i} className="rendered-content">
                    <img className="picture" src={location.imageUrl} />
                    <div className="header">Name
                        <p>{location.name}</p>
                    </div >
                    <div className="header">Price
                        <p>${location.price}/night</p>
                    </div >
                    <div className="header">Address
                        <p>{location.address} {location.unit}</p>
                        <p>{location.city}, {location.state} {location.zipcode}</p>
                        <p>{location.country}</p>
                    </div>
                    <div className="header-description">Description
                        <p>{location.description}</p>
                    </div>
                    <HostFormModal location={location} />
                    <button value={location.id} onClick={handleCancel}>REMOVE</button>
                </div>
            })}
        </>
    );
}

export default HostLocations;
