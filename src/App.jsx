import { useState, useEffect, useRef } from "react";
import { setNotification } from "./reducers/notificationReducer";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import UserList from "./components/UserList";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";
import { loginUser, logoutUser, setUser } from "./reducers/userReducer";
import { Routes, Route, useMatch } from "react-router-dom";
import BlogList from "./components/BlogList";
import User from "./components/User";

const App = () => {
  /* REDUX */
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(); // to dispatch redux actions to change the state

  /* STATE */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* EFFECTS */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON !== null) {
      const loggedUser = JSON.parse(loggedUserJSON);

      // HERE DISPATCH A REDUX ACTION TO SET USER
      dispatch(setUser(loggedUser));
    }
  }, [dispatch]);

  /* HANDLERS */
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

  const handleLogout = async (event) => {
    dispatch(logoutUser());
  };

  /* VIEW */

  if (user === null) {
    return (
      <>
        <h1>Please, login</h1>
        <Notification />
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
  }

  return (
    <>
      <h1>Blogs App</h1>
      <div>
        <span>{user.name} logged in</span>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Notification />
      <Routes>
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </>
  );
};

export default App;
