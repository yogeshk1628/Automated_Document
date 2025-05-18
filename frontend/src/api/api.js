import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Update this if your backend uses a different port or route prefix
});

export default API;
