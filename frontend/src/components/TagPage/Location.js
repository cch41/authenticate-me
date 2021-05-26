import './TagPage.css';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setLocation } from '../../store/location';
import { useDispatch } from 'react-redux';


const Location = ({ location }) => {
    const [reviewCount, setReviewCount] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = async () => {
        history.push(`/locations/${location.id}`)
    };

    return (
        <div className="location-picture" onClick={handleClick} style={{ backgroundImage: `url(${location.imageUrl})` }}>
            <div className="location-information">
                <div className="location-name">{location.name}</div>
                <div className="location-address">{`${location.city}, ${location.state} (${location.country})`}</div>
                <div className="location-reviews-price">
                    <span>{reviewCount} reviews</span>
                    <span>{`$${location.price}/night`}</span>
                </div>
            </div>
        </div>
    );
}

export default Location;
