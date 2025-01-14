// Defines de GLOBAL STATE STRUCTURE

import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";

// This creates and configures the store, determining also the global state structure, and its reducers
// Uses the redux toolkit
const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store;

// the global state has the form of { notification }
