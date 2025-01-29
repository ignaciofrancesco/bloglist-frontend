import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";

const Login = (props) => {
  /* REDUX */
  const dispatch = useDispatch(); // to dispatch redux actions to change the state

  /* STATE */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    // Use the login service to login
    try {
      // HERE DISPATCH A REDUX ACTION TO login USER
      dispatch(loginUser(username, password));

      // Set new state
      setUsername("");
      setPassword("");

      // Dispatch redux action for notification
      dispatch(
        setNotification({
          message: `Login successful`,
          messageType: "success",
        }),
      );
    } catch (error) {
      // Dispatch redux action
      dispatch(
        setNotification({
          message: `Invalid credentials`,
          messageType: "error",
        }),
      );
    }
  };

  return (
    <>
      <h2>Please, login</h2>
      <form onSubmit={handleLogin} data-testid="login-form">
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            data-testid="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            data-testid="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
