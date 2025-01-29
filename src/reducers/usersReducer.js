import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import loginService from "../services/login";
import usersService from "../services/users";

// Create the users slice
// Uses redux toolkit
const usersSlice = createSlice({
  name: "users",
  initialState: [],
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

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(set(users));
  };
};

export default usersSlice.reducer; // to import in the config store
export const { set, unset } = usersSlice.actions; // to use in the redux thunk functions
