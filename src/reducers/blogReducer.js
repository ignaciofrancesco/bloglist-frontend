import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import blogsService from "../services/blogs";

// Create the blog slice
// Uses redux toolkit
const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    set(state, action) {
      const allBlogs = action.payload;
      return allBlogs;
    },
    append(state, action) {
      state.push(action.payload);
    },
    update(state, action) {
      return action.payload;
    },
    remove(state, action) {
      return null;
    },
  },
});

/* REDUX THUNK FUNCTIONS */

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(set(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    // Create blog in db
    const blogCreated = await blogsService.create(blog);
    // Change state
    dispatch(append(blogCreated));
  };
};

export default blogSlice.reducer; // to import in the config store
export const { set, append, update, remove } = blogSlice.actions; // to use in the redux thunk functions
