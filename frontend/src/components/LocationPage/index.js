import { useState, useEffect } from "react";
import "./LocationPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router";
import { getLocation } from "../../store/location";
import BookingForm from "./BookingForm";
import Weather from "./Weather";

const LocationPage = () => {
  const { locationId } = useParams();
  const location = useSelector((state) => state.locations.currentLocation);
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

  const user = useSelector((state) => state.session.user);
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
          <div className="location-reviews">
            <h3>{location.Reviews.length} reviews</h3>
            {location.Reviews.map((review, i) => (
              <div key={i} className="one-review">
                <div className="reviews-header">
                  {review.recommends && (
                    <>
                      <span className="i-container up">
                        <i className="fas fa-solid fa-thumbs-up"></i>
                      </span>
                      <span className="username">
                        {review.User.username + " "}{" "}
                      </span>
                      <span className="rec">- recommends this listing.</span>
                    </>
                  )}
                  {!review.recommends && (
                    <>
                      <span className="i-container down">
                        <i className="fas fa-solid fa-thumbs-down"></i>
                      </span>
                      <span className="username">
                        {review.User.username + " "}
                      </span>
                      <span className="rec">
                        - doesn't recommend this listing.
                      </span>
                    </>
                  )}
                </div>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LocationPage;
