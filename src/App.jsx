import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON !== null) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    // Use the login service to login
    try {
      const user = await loginService.login(username, password);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async (event) => {
    // Clear localstorage
    window.localStorage.removeItem("loggedUser");
    // Clear state
    setUser(null);
  };

  if (user === null) {
    return (
      <>
        <h1>Please, login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              value={username}
              onInput={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              value={password}
              onInput={(event) => {
                setPassword(event.target.value);
              }}
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
      <div>
        <span>{user.name} logged in</span>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default App;
