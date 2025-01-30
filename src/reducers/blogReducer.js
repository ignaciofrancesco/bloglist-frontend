import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

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
      const updatedBlog = action.payload;
      const newBlogsArray = state.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b,
      );
      return newBlogsArray;
    },
    remove(state, action) {
      const blogDeleted = action.payload;
      const newBlogsArray = state.filter((b) => {
        return b.id !== blogDeleted.id;
      });

      return newBlogsArray;
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

export const updateBlog = (blog) => {
  return async (dispatch) => {
    // Save blog in db
    const updatedBlog = await blogsService.update(blog);
    // Update state
    dispatch(update(updatedBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      // Delete from db
      await blogsService.deleteBlog(blog);
      // Update state
      dispatch(remove(blog));
      // Dispatch redux action to notificate
      dispatch(
        setNotification({
          message: `Blog deleted: ${blog.title}`,
          messageType: "success",
        }),
      );
    } catch (error) {
      // Dispatch redux action to notificate
      dispatch(
        setNotification({
          message: `Couldn't delete the blog: ${error.message}`,
          messageType: "error",
        }),
      );
    }
  };
};

export const postComment = (commentContent, blog) => {
  return async (dispatch) => {
    try {
      // Create comment object
      const newComment = { content: commentContent };
      // Create comment in db
      const updatedBlog = await blogsService.createComment(newComment, blog);
      // Update state
      dispatch(update(updatedBlog));

      // Dispatch redux action to notificate
      dispatch(
        setNotification({
          message: `Comment posted!`,
          messageType: "success",
        }),
      );
    } catch (error) {
      // Dispatch redux action to notificate
      dispatch(
        setNotification({
          message: `Couldn't create the comment: ${error.message}`,
          messageType: "error",
        }),
      );
    }
  };
};

/* OTHER FUNCTIONS */
export const selectBlogById = (state, id) => {
  return state.blogs.find((b) => b.id === id);
};

export default blogSlice.reducer; // to import in the config store
export const { set, append, update, remove } = blogSlice.actions; // to use in the redux thunk functions
