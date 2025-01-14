// Defines de GLOBAL STATE STRUCTURE

import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";

// This creates and configures the store, determining also the global state structure, and its reducers
// Uses the redux toolkit
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
});

export default store;

// the global state has the form of { notification }
