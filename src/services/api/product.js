import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-ecommerce-cy7j.onrender.com/api/product",
  timeout: 5000, // İsteklerin zaman aşımı süresi (ms)
  withCredentials: true,
});

export const getAllProductsAPI = (query) => {
  return api.get(`/getAllProducts${query}`);
};

export const getSingleProductAPI = (productId) => {
  return api.get(`/detail/${productId}`);
};

export const getFavProductsAPI = (query) => {
  return api.get(`/getFavProducts${query}`);
};

export default api;
