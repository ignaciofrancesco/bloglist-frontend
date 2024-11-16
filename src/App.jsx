import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogsService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogsService.getAll().then((blogs) => setBlogs(blogs));
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

      // Set authorization in the blogs service
      blogsService.setAuthorization(user.token);

      // Save user to local storage
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      // Set new state
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
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

  const handleSubmitBlog = async (event) => {
    event.preventDefault();

    // Post blog to the backend
    const newBlog = {
      title,
      author,
      url,
    };

    const createdBlog = await blogsService.create(newBlog);

    // Add blog to state
    const newBlogsArray = blogs.concat(createdBlog);
    setBlogs(newBlogsArray);

    // Clear form
    setTitle("");
    setAuthor("");
    setUrl("");
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
      <br></br>
      <form onSubmit={handleSubmitBlog}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            value={title}
            onInput={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            id="author"
            type="text"
            value={author}
            onInput={(event) => {
              setAuthor(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="url">Url: </label>
          <input
            id="url"
            type="text"
            value={url}
            onInput={(event) => {
              setUrl(event.target.value);
            }}
          />
        </div>
        <button type="submit">Create</button>
      </form>
      <br></br>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default App;
