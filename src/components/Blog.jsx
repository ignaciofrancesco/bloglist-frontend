import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeBlog, updateBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  /* REDUX */
  const dispatch = useDispatch();

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <p>
          {blog.title}, by {blog.author}
          <button
            type="button"
            onClick={toggleDetails}
            data-testid="show-hide-button"
          >
            {detailsShowing ? "Hide" : "View"}
          </button>
        </p>
        {detailsShowing && (
          <ul>
            <li>{blog.url}</li>
            <li data-testid="likes">
              <span>Likes {blog.likes} </span>
              <button onClick={handleClickLike} data-testid="like-button">
                like
              </button>
            </li>
            {blog.user && <li>{blog.user.name}</li>}
          </ul>
        )}
        {blog.user.name === user.name && (
          <button onClick={handleClickRemove}>Remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
