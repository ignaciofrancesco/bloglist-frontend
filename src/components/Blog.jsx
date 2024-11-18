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

  // Add a button to delete blog
  // Implement deleting in the backend
  // Ask for confirmation before deleting

  // Show the button only for blogs created by the logged in user

  return (
    <div style={blogStyle}>
      <div>
        <p>
          {blog.title}, by {blog.author}
          <button type="button" onClick={toggleDetails}>
            {detailsShowing ? "Hide" : "View"}
          </button>
        </p>
        {detailsShowing && (
          <ul>
            <li>{blog.url}</li>
            <li>
              Likes {blog.likes} <button onClick={handleClickLike}>like</button>
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
