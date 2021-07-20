import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    };

    return (
        <div className="profile-container" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
            <button className="profile-button">
                <i className="fas fa-user"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li><span onClick={() => history.push("/account")}>Account</span></li>
                    <li><span onClick={() => history.push("/about")}>About SurfCamp</span></li>
                    <li className="logout" onClick={logout}>Logout</li>
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
