import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-ecommerce-cy7j.onrender.com/api/auth", // API'nin temel URL'i
  timeout: 5000, // İsteklerin zaman aşımı süresi (ms)
  withCredentials: true,
});

export const registerAPI = (user) => {
  return api.post(`/register`, user);
};

export const loginAPI = (user) => {
  return api.post(`/login`, user);
};

export const logoutAPI = () => {
  return api.get(`/logout`);
};

export default api;
