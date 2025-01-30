import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../reducers/blogReducer";

const CommentForm = (props) => {
  const { blog } = props;

  /* STATE */
  const [commentContent, setCommentContent] = useState("");

  /* REDUX */
  const dispatch = useDispatch();

  /* REACT ROUTER */

  /* HANDLERS */

  const handleSubmitComment = (event) => {
    event.preventDefault();

    if (!commentContent) {
      alert("Comments cannot be empty");
      return;
    }

    dispatch(postComment(commentContent, blog));

    setCommentContent("");
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root, & .MuiButton-root": { width: "25ch" },
        display: "flex",
        gap: "1rem",
        mb: "2rem",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmitComment}
    >
      <TextField
        type="text"
        variant="outlined"
        size="small"
        value={commentContent}
        placeholder="Type your comment..."
        onChange={(event) => setCommentContent(event.target.value)}
      />
      <Button variant="contained" size="small" type="submit">
        Add Comment
      </Button>
    </Box>
  );
};

export default CommentForm;
