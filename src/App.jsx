import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import User from "./components/User";
import UserList from "./components/UserList";
import { setUser } from "./reducers/userReducer";

const App = () => {
  /* REDUX */
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(); // to dispatch redux actions to change the state

  /* EFFECTS */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      // HERE DISPATCH A REDUX ACTION TO SET USER
      dispatch(setUser(loggedUser));
    }
  }, [dispatch]);

  /* VIEW */

  return (
    <Container sx={{ paddingTop: "78px" }}>
      <NavBar />
      <Notification />
      <Routes>
        {/* The slash always redirects to blogs or login */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate replace to="/blogs" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        {/* If the user is logged in, show the blogs instead */}
        <Route
          path="/login"
          element={user ? <Navigate replace to="/blogs" /> : <Login />}
        />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Container>
  );
};

export default App;
