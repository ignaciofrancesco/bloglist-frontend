import axios from "axios";
const baseUrl = "/api/blogs";

let authorization = null;

const setAuthorization = (token) => {
  authorization = `Bearer ${token}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: authorization,
    },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: authorization,
    },
  };

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);

  return response;
};

const createComment = async (comment, blog) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, comment);

  return response.data;
};

export default {
  getAll,
  setAuthorization,
  create,
  update,
  deleteBlog,
  createComment,
};
