import { Box, Button, TextField } from "@mui/material";
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
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root, & .MuiButton-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmitBlog}
    >
      <div>
        <TextField
          id="title"
          type="text"
          label="Title"
          variant="outlined"
          size="small"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          data-testid="title-input"
        />
      </div>
      <div>
        <TextField
          id="author"
          type="text"
          label="author"
          variant="outlined"
          size="small"
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
          data-testid="author-input"
        />
      </div>
      <div>
        <TextField
          id="url"
          type="text"
          label="url"
          variant="outlined"
          size="small"
          value={url}
          onChange={(event) => {
            setUrl(event.target.value);
          }}
          data-testid="url-input"
        />
      </div>

      <Button type="submit" variant="contained" data-testid="create-button">
        Create
      </Button>
    </Box>
  );
};

export default BlogForm;
