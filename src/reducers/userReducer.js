import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

// Create the user slice
// Uses redux toolkit
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    unset(state, action) {
      return null;
    },
  },
});

/* REDUX THUNK FUNCTIONS */

export const setUser = (user) => {
  return async (dispatch) => {
    // Set the authorization token
    blogsService.setAuthorization(user.token);
    // Dispatch actions
    dispatch(set(user));
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      // Login user
      const user = await loginService.login(username, password);
      // Save user to local storage
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      // Set the authorization token
      blogsService.setAuthorization(user.token);
      // Dispatch action to update state
      dispatch(set(user));
      // Dispatch redux action for notification
      dispatch(
        setNotification({
          message: `Login successful`,
          messageType: "success",
        }),
      );
    } catch (error) {
      // Dispatch redux action
      dispatch(
        setNotification({
          message: `Invalid credentials`,
          messageType: "error",
        }),
      );
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    // Clear token in blogs service
    blogsService.setAuthorization(null);
    // Clear localstorage
    window.localStorage.removeItem("loggedUser");
    // Clear state
    dispatch(unset());
  };
};

export default userSlice.reducer; // to import in the config store
export const { set, unset } = userSlice.actions; // to use in the redux thunk functions
