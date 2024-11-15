import axios from "axios";
const baseUrl = "/api/login";

//// CONTINUE HERE, check how to make the call to the login api

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password });
  const user = response.data;
  return user;
};

export default { login };
