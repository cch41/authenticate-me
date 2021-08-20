import "./TagPage.css";
import { useHistory } from "react-router-dom";

const Location = ({ location, user }) => {
  const history = useHistory();

  const handleClick = async () => {
    // if (!user) {

    // } else {
    history.push(`/locations/${location.id}`);
    // }
  };

  return (
    <div
      className="location-picture"
      onClick={handleClick}
      style={{ backgroundImage: `url(${location.imageUrl})` }}
    >
      <div className="location-information">
        <div className="location-name">{location.name}</div>
        <div className="location-address">{`${location.city}, ${location.state} (${location.country})`}</div>
        <div className="location-reviews-price">{`$${location.price}/night`}</div>
      </div>
    </div>
  );
};

export default Location;
