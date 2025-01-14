import { createSlice } from "@reduxjs/toolkit";

// Create the notification slice
// Uses redux toolkit
const notificationSlice = createSlice({
  name: "notification",
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

export const setNotification = (notification) => {
  return async (dispatch) => {
    // Dispatch actions
    dispatch(set(notification));
    // Register a timeout to unset
    setTimeout(() => {
      dispatch(unset());
    }, 5000);
  };
};

export default notificationSlice.reducer; // to import in the config store
export const { set, unset } = notificationSlice.actions; // to use in the redux thunk functions
