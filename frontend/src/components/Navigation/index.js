import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const user = useSelector(state => state.session.user);


    let sessionLinks;
    if (user) {
        sessionLinks = (
            <ProfileButton user={user} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal  />
                <NavLink to='/signup'>Signup</NavLink>
            </>
        );
    }

    return (
        <div className="nav-bar">
                <NavLink className="home" to='/'>Home</NavLink>
                <NavLink className="host" to='/host'>Host</NavLink>
                { isLoaded && sessionLinks }
        </div>
    );
}

export default Navigation;
