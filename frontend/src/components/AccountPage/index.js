import { useSelector } from 'react-redux';
import './AccountPage.css';

const Account = () => {
    const user = useSelector(state => state.session.user);

    return (
        <div className="user-information">
            <div>{user.email}</div>
            <div>{user.username}</div>
        </div>
    );
}

export default Account;
