import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogsService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  /* STATE */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  /* REFS */
  const blogFormRef = useRef();

  /* EFFECTS */
  useEffect(() => {
    blogsService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
    } catch (error) {
      setNotification({
        message: `Invalid credentials: ${error.message}`,
        type: "error",
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
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

  const createBlog = async (newBlog) => {
    try {
      // Hide the BlogForm immediately
      blogFormRef.current.toggleVisibility();

      // Tries to create blog in the backend
      const createdBlog = await blogsService.create(newBlog);

      // Add blog to state
      const newBlogsArray = blogs.concat(createdBlog);
      setBlogs(newBlogsArray);

      // Notificates the user
      setNotification({
        message: `New blog created: ${createdBlog.title}`,
        type: "success",
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification({
        message: `Couldn't create the blog: ${error.message}`,
        type: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      console.error(error);
    }
  };

  // This is a multipurpose updater. Only takes care of updating the blog received as a parameter.
  const updateBlog = async (blog) => {
    try {
      // Update blog through the backend
      const updatedBlog = await blogsService.update(blog);
      // Update state
      const newBlogsArray = [...blogs].map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b
      );
      setBlogs(newBlogsArray);
    } catch (error) {
      setNotification({
        message: `Couldn't update the blog: ${error.message}`,
        type: "error",
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const deleteBlog = async (blog) => {
    try {
      // Delete request to back
      const result = await blogsService.deleteBlog(blog);
      // Update state
      const newBlogsArray = blogs.filter((b) => b.id !== blog.id);
      setBlogs(newBlogsArray);
    } catch (error) {
      setNotification({
        message: `Couldn't remove the blog: ${error.message}`,
        type: "error",
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
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
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => {
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
              onChange={(event) => {
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
      <Notification notification={notification} />
      <div>
        <span>{user.name} logged in</span>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <br></br>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <br></br>
      <div>
        {blogsSorted.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </>
  );
};

export default App;
