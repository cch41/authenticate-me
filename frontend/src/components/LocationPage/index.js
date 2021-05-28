import { useState, useEffect } from 'react';
import './LocationPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router';
import { getLocation } from '../../store/location';
import BookingForm from './BookingForm';

const LocationPage = () => {
    const { locationId } = useParams();
    const [location, setLocation] = useState({});
    const [reviewCount, setReviewCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getCurrentLocation() {
            const currentLocation = await dispatch(getLocation(locationId));
            setLocation(currentLocation);
            setReviewCount(currentLocation.Reviews.length);
            setIsLoaded(true);
            return
        }
        getCurrentLocation();
    }, [locationId, dispatch]);

    const user = useSelector(state => state.session.user);
    if (!user) return <Redirect to="/signup"/>;

    return (
        <>
            { isLoaded &&
                <>
                    <BookingForm locationId={location.id} />
                    <div className="location-container">
                        <div className="location-picture" style={{ backgroundImage: `url(${location.imageUrl})` }}></div>
                        <div className="location-information">
                            <div className="location-name">{location.name}</div>
                            <div className="location-address">{`${location.city}, ${location.state} (${location.country})`}</div>
                            <div className="location-description">{location.description}</div>
                            <div className="location-price">{`$${location.price}/night`}</div>
                        </div>
                        <div className="location-reviews">
                            <h3>{reviewCount} reviews</h3>
                            {location.Reviews.map((review, i) => (
                                <div key={i}>{review.content}</div>
                            ))}
                        </div>
                    </div>
                    <div className="booking-form-container">

                    </div>
                </>
            }
        </>
    );
}

export default LocationPage;
