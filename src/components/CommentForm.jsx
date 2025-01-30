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
    <>
      <form onSubmit={handleSubmitComment}>
        <input
          type="text"
          value={commentContent}
          placeholder="Type your comment..."
          onChange={(event) => setCommentContent(event.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    </>
  );
};

export default CommentForm;
