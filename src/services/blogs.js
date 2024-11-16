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

  try {
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { getAll, setAuthorization, create };
