import { useEffect } from "react";
import usersService from "../services/users";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";

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
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td>loading users...</td>
            </tr>
          ) : (
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
