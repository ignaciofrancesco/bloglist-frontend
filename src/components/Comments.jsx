const Comments = (props) => {
  const { comments } = props;

  return (
    <>
      <h3>Comments</h3>
      {comments.map((c) => (
        <li key={c.id}>{c.content}</li>
      ))}
    </>
  );
};

export default Comments;
