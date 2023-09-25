import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-ecommerce-cy7j.onrender.com/api/user",
  timeout: 5000, // İsteklerin zaman aşımı süresi (ms)
  withCredentials: true,
});

export const getUserAPI = () => {
  return api.get(`/profile`);
};

export const getCartAPI = (cart) => {
  return api.post(`/cart`, cart);
};

export const editDetailsAPI = (data) => {
  return api.put(`/edit`, data);
};

export const favProductAPI = (productId) => {
  return api.put(`/${productId}/fav`);
};

export const addOrderAPI = (orders) => {
  return api.put(`/addOrder`, orders);
};

export const addCommentAPI = (data) => {
  return api.post(`/addComment/${data.id}`, data.info);
};

export const changePasswordAPI = (data) => {
  return api.put(`/changePassword`, data);
};

export const deleteAccountAPI = (data) => {
  return api.delete("/deleteAccount", {
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  });
};

export default api;
