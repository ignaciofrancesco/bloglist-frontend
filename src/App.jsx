import { useState, useEffect, useRef } from "react";
import { setNotification } from "./reducers/notificationReducer";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogsService from "./services/blogs";
import loginService from "./services/login";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  /* REDUX */
  const blogs = useSelector((state) => state.blogs); // i select the slice of state i need
  const dispatch = useDispatch(); // to dispatch redux actions to change the state

  /* STATE */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  /* REFS */
  const blogFormRef = useRef();

  /* EFFECTS */
  // Initializes the blogs array
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON !== null) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogsService.setAuthorization(loggedUser.token);
    }
  }, []);

  /* HANDLERS */
  const handleLogin = async (event) => {
    event.preventDefault();

    // Use the login service to login
    try {
      const user = await loginService.login(username, password);

      // Set authorization in the blogs service
      blogsService.setAuthorization(user.token);

      // Save user to local storage
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      // Set new state
      setUser(user);
      setUsername("");
      setPassword("");
      // Dispatch redux action
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
    // Clear token in blogs service
    blogsService.setAuthorization(null);
    // Clear localstorage
    window.localStorage.removeItem("loggedUser");
    // Clear state
    setUser(null);
  };

  const handleSubmitBlog = async (newBlog) => {
    try {
      // Hide the BlogForm immediately
      blogFormRef.current.toggleVisibility();

      // Use redux thunk to save to db and change state
      dispatch(createBlog(newBlog));

      // Dispatch redux action to notificate
      dispatch(
        setNotification({
          message: `New blog created: ${newBlog.title}`,
          messageType: "success",
        }),
      );
    } catch (error) {
      // Dispatch redux action to notificate
      dispatch(
        setNotification({
          message: `Couldn't create the blog: ${error.message}`,
          messageType: "error",
        }),
      );
    }
  };

  /* VIEW */

  // Sort in descending order
  const blogsSorted = blogs.toSorted((b1, b2) => {
    return b2.likes - b1.likes;
  });

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
      <h1>Blogs</h1>
      <Notification />
      <div>
        <span>{user.name} logged in</span>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <br></br>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={handleSubmitBlog} />
      </Togglable>
      <br></br>
      <div className="bloglist">
        {blogsSorted.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </>
  );
};

export default App;
