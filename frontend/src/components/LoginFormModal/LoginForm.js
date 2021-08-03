import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginFormPage = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  function demoLogin() {
    setCredential("demo@user.io");
    setPassword("password");
    onSubmit();
  }

  const onSubmit = (e) => {
    if (e) e.preventDefault();

    // "Make sure to handle any errors from the thunk if there are any"
    return dispatch(login({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <form className="login" onSubmit={onSubmit}>
      <ul>
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
      <label htmlFor="credential">Username or Email</label>
      <input
        name="credential"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
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
      <button id="submit" type="submit">
        LOGIN
      </button>
      <button onClick={demoLogin}>DEMO LOGIN</button>
    </form>
  );
};

export default LoginFormPage;
