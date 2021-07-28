import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import logo from "../../images/logos/color_logo.png";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <NavLink className="user-nav" to="/trips">
          Trips
        </NavLink>
        <NavLink className="user-nav" to="/hosting">
          Hosting
        </NavLink>
        <ProfileButton user={user} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <span className="about" onClick={() => history.push("/about")}>
          About
        </span>
        <LoginFormModal />
        <NavLink className="signup" to="/signup">
          Signup
        </NavLink>
      </>
    );
  }

  return (
    <div className="nav-bar">
      <img
        src={logo}
        className="logo"
        onClick={() => history.push("/")}
        alt="logo"
      />
      <div className="nav-bar right">{isLoaded && sessionLinks}</div>
    </div>
  );
};

export default Navigation;
