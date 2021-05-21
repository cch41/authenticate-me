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
                <LoginFormModal />
                <NavLink to='/signup'>Signup</NavLink>
            </>
        );
    }

    return (
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
                { isLoaded && sessionLinks }
            </li>
        </ul>
    );
}

export default Navigation;
