import { useState } from "react";

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  /* STATE */
  const [detailsShowing, setDetailsShowing] = useState(false);

  /* HANDLERS */
  const toggleDetails = (event) => {
    setDetailsShowing(!detailsShowing);
  };

  const handleClickLike = async (event) => {
    // Increase likes
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    // Call the prop function to update database, and state of the app
    await updateBlog(updatedBlog);
  };

  const handleClickRemove = async (event) => {
    const confirms = window.confirm(
      `Do you really want to remove the blog "${blog.title}"?`
    );

    if (!confirms) {
      return;
    }

    const result = await deleteBlog(blog);
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
