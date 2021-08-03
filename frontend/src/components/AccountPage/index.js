import { useSelector } from "react-redux";
import "./AccountPage.css";

const Account = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="account-container">
      <div className="user-information">
        <div>
          <div className="account-header">Email</div>
          <div>{user.email}</div>
        </div>
        <div>
          <div className="account-header">Username</div>
          <div>{user.username}</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
