import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-ecommerce-cy7j.onrender.com/api/seller",
  timeout: 5000, // İsteklerin zaman aşımı süresi (ms)
  withCredentials: true,
});

export const getProductsAPI = (query) => {
  return api.get(`/getProducts${query}`);
};

export const addProductAPI = (data) => {
  return api.post(`/add-product`, data);
};

export const deleteProductAPI = (id) => {
  return api.delete(`/product/delete/${id}`);
};

export const editProductAPI = (data, id) => {
  return api.put(`/product/update/${id}`, data);
};

export default api;
