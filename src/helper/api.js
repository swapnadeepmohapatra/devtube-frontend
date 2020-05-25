import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
});

export default api;
