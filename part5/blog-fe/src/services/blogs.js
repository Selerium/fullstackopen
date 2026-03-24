import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const updateLikes = (id, body, headers) => {
  const request = axios.put(`${baseUrl}/${id}`, body, headers);
  return request.then((response) => response.data);
};

const deletePost = (id, headers) => {
  const request = axios.delete(`${baseUrl}/${id}`, headers);
  return request.then((response) => response.data);
};

export default { getAll, updateLikes, deletePost };
