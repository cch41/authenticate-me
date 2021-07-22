import { useState, useEffect } from 'react';
import './LocationPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router';
import { getLocation } from '../../store/location';
import BookingForm from './BookingForm';

const LocationPage = () => {
    const { locationId } = useParams();
    const location = useSelector(state => state.locations.currentLocation)
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getLocation(locationId));
            setIsLoaded(true);
            return
        })();
    }, [locationId, dispatch]);

    const user = useSelector(state => state.session.user);
    if (!user) return <Redirect to="/signup"/>;

    return (
        <>
            { isLoaded &&
                <div className="location-container">
                    <img className="one-location-picture" src={location.imageUrl}/>
                    <div className="location-booking-information">
                        <div className="location-information">
                            <div className="location-name">{location.name}</div>
                            <div className="location-address">{`${location.city}, ${location.state} (${location.country})`}</div>
                            <div className="location-description">{location.description}</div>
                            <div className="location-price">{`$${location.price}/night`}</div>
                        </div>
                        <BookingForm locationId={location.id} />
                    </div>
                    <div className="location-reviews">
                        <h3>{location.Reviews.length} reviews</h3>
                        {location.Reviews.map((review, i) => (
                            <div key={i}><h5>{review.User.username}</h5><p>{review.content}</p></div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}

export default LocationPage;
