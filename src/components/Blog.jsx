import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
  /* STATE */
  const [detailsShowing, setDetailsShowing] = useState(false);

  /* HANDLERS */
  const toggleDetails = (event) => {
    setDetailsShowing(!detailsShowing);
  };

  /* STYLES */
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  /* HANDLERS */
  const handleClickLike = async (event) => {
    // Increase likes
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    // Call the prop function to update database, and state of the app
    await updateBlog(updatedBlog);
  };

  /* VIEW */

  // Create html
  // Make it interactive
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
      </div>
    </div>
  );
};

export default Blog;
