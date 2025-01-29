import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useEffect, useRef } from "react";
import { createBlog, initializeBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";

const BlogList = (props) => {
  /* REDUX */
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs); // i select the slice of state i need
  const dispatch = useDispatch();

  /* REFS */
  const blogFormRef = useRef();

  /* EFFECTS */
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

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

  // Sort in descending order
  const blogsSorted = blogs.toSorted((b1, b2) => {
    return b2.likes - b1.likes;
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    listStyle: "none",
  };

  return (
    <>
      <br></br>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={handleSubmitBlog} />
      </Togglable>
      <br></br>
      <div className="bloglist">
        <ul style={{ padding: 0 }}>
          {blogsSorted.map((blog) => (
            <li key={blog.id} className="blog" style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BlogList;
