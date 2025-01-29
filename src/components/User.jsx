import { useEffect, useState } from "react";
import usersService from "../services/users";
import { useParams } from "react-router-dom";

const User = (props) => {
  const [user, setUser] = useState(null);
  const userId = useParams().id;

  useEffect(() => {
    usersService.getById(userId).then((user) => {
      setUser(user);
    });
  }, [userId]);

  if (!user) {
    return <p>loading user...</p>;
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
