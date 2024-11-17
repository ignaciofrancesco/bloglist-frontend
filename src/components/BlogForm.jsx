import { useState } from "react";

const BlogForm = (props) => {
  /* STATE */
  const { createBlog } = props;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  /* HANDLERS */
  const handleSubmitBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    await createBlog(newBlog);

    // Clear form
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  /* VIEW */
  return (
    <form onSubmit={handleSubmitBlog}>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => {
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
          onChange={(event) => {
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
          onChange={(event) => {
            setUrl(event.target.value);
          }}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
