import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fgmanager-api.herokuapp.com'
});

export default api;