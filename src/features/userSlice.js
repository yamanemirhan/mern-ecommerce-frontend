import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCommentAPI,
  addOrderAPI,
  changePasswordAPI,
  deleteAccountAPI,
  editDetailsAPI,
  favProductAPI,
  getCartAPI,
  getUserAPI,
} from "../services/api/user.js";
import newToast from "../services/toast/toast.js";
import { getAllProductsAPI } from "../services/api/product.js";
import { logout } from "./authSlice.js";

const initialState = {
  user: null,
  cart: [],
  loading: {
    getUser: false,
    addOrder: false,
    addComment: false,
    changePassword: false,
  },
  error: {
    getUser: null,
    addOrder: null,
    addComment: null,
    changePassword: null,
  },
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (user, thunkAPI) => {
    try {
      const response = await getUserAPI(user);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getCart = createAsyncThunk(
  "user/getCart",
  async (cart, thunkAPI) => {
    try {
      const response = await getCartAPI(cart);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editDetails = createAsyncThunk(
  "user/editDetails",
  async (data, thunkAPI) => {
    try {
      const response = await editDetailsAPI(data);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const favProduct = createAsyncThunk(
  "user/favProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await favProductAPI(productId);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "user/getAllProducts",
  async (query, thunkAPI) => {
    try {
      const response = await getAllProductsAPI(query);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const addOrder = createAsyncThunk(
  "user/addOrder",
  async (orders, thunkAPI) => {
    try {
      const response = await addOrderAPI(orders);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const addComment = createAsyncThunk(
  "user/addComment",
  async (data, thunkAPI) => {
    try {
      const response = await addCommentAPI(data);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data, thunkAPI) => {
    try {
      const response = await changePasswordAPI(data);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (data, thunkAPI) => {
    try {
      const response = await deleteAccountAPI(data);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ [action.payload._id]: action.payload.quantity });
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    decreaseQuantityCart: (state, action) => {
      const updatedCart = state.cart.map((item) =>
        item._id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      const updatedCartIds = updatedCart.map((item) => ({
        [item._id]: item.quantity,
      }));

      localStorage.setItem("cart", JSON.stringify(updatedCartIds));

      state.cart = updatedCart;
    },
    increaseQuantityCart: (state, action) => {
      const updatedCart = state.cart.map((item) =>
        item._id === action.payload && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      const updatedCartIds = updatedCart.map((item) => ({
        [item._id]: item.quantity,
      }));

      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(updatedCartIds));

      state.cart = updatedCart;
    },
    removeProductFromCart: (state, action) => {
      const updatedCart = state.cart.filter(
        (item) => item._id !== action.payload
      );
      state.cart = updatedCart;
      const cart = state.cart.map((item) => ({
        [item._id]: item.quantity,
      }));
      localStorage.removeItem(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    clearCart: (state, action) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = [];
        state.cart = [];
      })

      .addCase(getUser.pending, (state) => {
        state.loading.getUser = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading.getUser = false;
        state.user = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading.getUser = false;
      })

      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
        const cart = action.payload.data.map((item) => ({
          [item._id]: item.quantity,
        }));
        localStorage.removeItem(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      })

      .addCase(editDetails.fulfilled, (state, action) => {
        if (action.payload.message === "Address added successfully") {
          state.user.addresses = action.payload.data;
        } else if (action.payload.message === "Address deleted successfully") {
          state.user.addresses = action.payload.data;
        } else {
          state.user = action.payload.data;
        }
      })

      .addCase(favProduct.fulfilled, (state, action) => {
        state.user.favProducts = action.payload.data;
      })

      .addCase(addOrder.pending, (state) => {
        state.loading.addOrder = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        localStorage.removeItem("cart");
        state.cart = [];
        state.user.orders = action.payload.orders;
        state.loading.addOrder = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading.addOrder = false;
        const id = action.payload.id;
        const orderIndex = state.user.orders.findIndex(
          (order) => order._id === id
        );
        if (orderIndex !== -1) {
          state.user.orders[orderIndex].comment = "The product was removed";
        }
      })

      .addCase(addComment.pending, (state) => {
        state.loading.addComment = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const updatedOrder = action.payload.data;
        const orderIndex = state.user.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (orderIndex !== -1) {
          state.user.orders[orderIndex] = updatedOrder;
        }
        state.loading.addComment = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading.addComment = false;
        const id = action.payload.id;
        const orderIndex = state.user.orders.findIndex(
          (order) => order._id === id
        );
        if (orderIndex !== -1) {
          state.user.orders[orderIndex].comment = "The product was removed";
        }
      })

      .addCase(changePassword.pending, (state) => {
        state.loading.changePassword = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading.changePassword = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading.changePassword = false;
      })

      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});

export const {
  addToCart,
  decreaseQuantityCart,
  increaseQuantityCart,
  removeProductFromCart,
  clearCart,
} = userSlice.actions;
export default userSlice.reducer;
