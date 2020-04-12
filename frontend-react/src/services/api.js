import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3350",
});

export default api;