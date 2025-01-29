import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  initializeBlogs,
  removeBlog,
  selectBlogById,
  updateBlog,
} from "../reducers/blogReducer";

const Blog = (props) => {
  /* REACT ROUTER */
  const blogId = useParams().id;

  /* REDUX */
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) => selectBlogById(state, blogId));

  /* EFFECTS */
  useEffect(() => {
    // This is done to work on page reload
    // If the blog is null, initialize the blogs redux state, which will cause a rerender, and will select the blog
    // include user check to prevent infinite loop in case the blog is not in the array
    if (!blog && user) {
      dispatch(initializeBlogs());
    }
  }, [dispatch, blog, user]);

  /* STATE */
  const [detailsShowing, setDetailsShowing] = useState(false);

  /* HANDLERS */

  const toggleDetails = (event) => {
    setDetailsShowing(!detailsShowing);
  };

  const handleClickLike = async (event) => {
    // Increase likes
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    // Call redux thunk
    dispatch(updateBlog(updatedBlog));
  };

  const handleClickRemove = async (event) => {
    const confirms = window.confirm(
      `Do you really want to remove the blog "${blog.title}"?`,
    );

    if (!confirms) {
      return;
    }

    dispatch(removeBlog(blog));
  };

  /* VIEW */

  if (!blog) {
    return <p>Loading blog...</p>;
  }

  return (
    <>
      <div className="blog">
        <div>
          <h2>
            {blog.title}, by {blog.author}
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a href={blog.url} target="__blank">
                {blog.url}
              </a>
            </li>
            <li data-testid="likes">
              <span>Likes {blog.likes} </span>
              <button onClick={handleClickLike} data-testid="like-button">
                like
              </button>
            </li>
            {blog.user && <li>Added by {blog.user.name}</li>}
          </ul>

          {blog.user.name === user.name && (
            <button onClick={handleClickRemove}>Remove</button>
          )}
        </div>
      </div>
      <br></br>
      <Link to="/blogs">Back</Link>
    </>
  );
};

export default Blog;
