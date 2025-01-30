const Comments = (props) => {
  const { comments } = props;

  return (
    <ul className="comment-list">
      {comments.map((c) => (
        <li key={c.id} className="comment">
          {c.content}
        </li>
      ))}
    </ul>
  );
};

export default Comments;
