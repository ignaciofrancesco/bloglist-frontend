import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import usersService from "../services/users";

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
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <TableContainer>
          <Table>
            <TableBody>
              {user.blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <br></br>
      <Link to="/users">Back</Link>
    </>
  );
};

export default User;
