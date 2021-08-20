import { useState, useEffect } from "react";
import "./LocationPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router";
import { getLocation } from "../../store/location";
import BookingForm from "./BookingForm";
import Weather from "./Weather";
import Reviews from "./Reviews";

const LocationPage = () => {
  const { locationId } = useParams();
  const location = useSelector((state) => state.locations.currentLocation);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [numRecommends, setNumRecommends] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getLocation(locationId));
      setIsLoaded(true);
      return;
    })();
  }, [locationId, dispatch]);

  useEffect(() => {
    if (location) {
      const recommends = location.Reviews.filter((review) => review.recommends);
      setNumRecommends(
        Math.round((recommends.length / location.Reviews.length) * 100)
      );
    }
  }, [location]);

  if (!user) return <Redirect to="/signup" />;

  return (
    <>
      {isLoaded && (
        <div className="location-container">
          <img className="one-location-picture" src={location.imageUrl} />
          <div className="location-booking-information">
            <div className="location-information">
              <div className="location-name">{location.name}</div>
              <div className="location-address">{`${location.city}, ${location.state} (${location.country})`}</div>
              <div className="location-description">{location.description}</div>
              <div className="location-recommends">
                <i className="fas fa-solid fa-thumbs-up"></i>
                <span>{numRecommends}%</span>
                <span>Recommend</span>
              </div>
            </div>
            <BookingForm locationId={location.id} price={location.price} />
          </div>
          <Weather city={location.city} state={location.state} />
          <Reviews reviews={location.Reviews} userId={user.id} />
        </div>
      )}
    </>
  );
};

export default LocationPage;
