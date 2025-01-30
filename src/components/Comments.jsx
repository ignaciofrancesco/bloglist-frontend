const Comments = (props) => {
  const { comments } = props;

  return (
    <>
      {comments.map((c) => (
        <li key={c.id}>{c.content}</li>
      ))}
    </>
  );
};

export default Comments;
