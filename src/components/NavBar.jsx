import { AppBar, Button, Toolbar, Typography } from "@mui/material";
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

  if (!user) {
    return (
      <AppBar position="fixed" sx={{ zIndex: 1200 }}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            BLOGS APP
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: 1200 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div className="menu-items-container">
          <Typography
            variant="h6"
            fontSize="inherit"
            color="inherit"
            component={Link}
            to="/blogs"
            sx={{ textDecoration: "none" }}
          >
            BLOGS
          </Typography>
          <Typography
            variant="h6"
            fontSize="inherit"
            color="inherit"
            component={Link}
            to="/users"
            sx={{ textDecoration: "none" }}
          >
            USERS
          </Typography>
        </div>
        <div className="menu-items-container">
          <em>{user.name} logged in</em>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
