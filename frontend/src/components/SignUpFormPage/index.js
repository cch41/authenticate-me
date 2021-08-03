import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SignUpForm.css";
import { signup } from "../../store/session";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (password.length > 5 && password !== confirmPassword) {
      setErrors(["Passwords must match"]);
    } else {
      setErrors([]);
    }
  }, [password, confirmPassword]);

  if (user) return <Redirect to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();

    return dispatch(signup({ email, username, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors([...errors, data.errors]);
      }
    );
  };

  return (
    <div className="signup-form-container">
      <form className="signup" onSubmit={onSubmit}>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        ></input>
        <button type="submit" disabled={errors.length}>
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
