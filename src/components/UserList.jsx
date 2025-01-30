import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeUsers } from "../reducers/usersReducer";

const UserList = (props) => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // Look for users in db
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <>
      <h2>Users</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell>loading users...</TableCell>
              </TableRow>
            ) : (
              users.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell align="center">{user.blogs.length}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserList;
