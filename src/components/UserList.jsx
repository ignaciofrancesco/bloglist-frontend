import { useEffect } from "react";
import usersService from "../services/users";
import { useDispatch, useSelector } from "react-redux";
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
            <p>loading users...</p>
          ) : (
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
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
