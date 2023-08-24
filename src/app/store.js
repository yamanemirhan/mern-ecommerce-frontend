import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import userReducer from "../features/userSlice.js";
import sellerReducer from "../features/sellerSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    seller: sellerReducer,
  },
});
