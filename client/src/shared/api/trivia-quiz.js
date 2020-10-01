import axios from 'axios';

const fetchClient = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  instance.interceptors.request.use((config) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData ? userData.token : '';

    config.headers.Authorization = token;

    return config;
  });

  return instance;
};

export default fetchClient();
