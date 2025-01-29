import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

const NavBar = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /* REACT ROUTER */
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <div>
          <span>{user.name} logged in</span>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
