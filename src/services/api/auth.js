import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/auth", // API'nin temel URL'i
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
