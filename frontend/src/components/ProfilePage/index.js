import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Account from './Account';
import HostLocations from './HostLocations';
import Bookings from './Bookings';

const Profile = () => {
    const user = useSelector(state => state.session.user);
    const [showAccount, setShowAccount] = useState(true);
    const [showHostLocations, setShowHostLocations] = useState(false);
    const [showBookings, setShowBookings] = useState(false);

    return (
        <div id="profile-container">
            <div className="show-container">
                <div className="profile-show" onClick={() => { setShowAccount(true); setShowHostLocations(false); setShowBookings(false); }}>Account</div>
                <div className="profile-show" onClick={() => { setShowAccount(false); setShowHostLocations(true); setShowBookings(false); }}>Hosted Locations</div>
                <div className="profile-show" onClick={() => { setShowAccount(false); setShowHostLocations(false); setShowBookings(true); }}>Bookings</div>
            </div>
            <div className="content-container">
                {showAccount && <Account />}
                {showHostLocations && <HostLocations userId={user.id} />}
                {showBookings && <Bookings userId={user.id} />}
            </div>
        </div>
    );
}

export default Profile;
