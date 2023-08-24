import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newToast from "../services/toast/toast.js";
import {
  addProductAPI,
  deleteProductAPI,
  editProductAPI,
  getProductsAPI,
} from "../services/api/seller.js";
import { logout } from "./authSlice.js";

const initialState = {
  products: [],
  loading: {
    getProducts: false,
    addProduct: false,
  },
  error: {
    getProducts: null,
    addProduct: null,
  },
};

export const getProducts = createAsyncThunk(
  "seller/getProducts",
  async (query, thunkAPI) => {
    try {
      const response = await getProductsAPI(query);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const addProduct = createAsyncThunk(
  "seller/addProduct",
  async (data, thunkAPI) => {
    try {
      const response = await addProductAPI(data);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "seller/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const response = await deleteProductAPI(id);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editProduct = createAsyncThunk(
  "seller/editProduct",
  async ({ data, id }, thunkAPI) => {
    try {
      const response = await editProductAPI(data, id);
      const result = response.data;
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.products = [];
      })

      .addCase(getProducts.pending, (state) => {
        state.loading.getProducts = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading.getProducts = false;
        state.products = action.payload.data.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading.getProducts = false;
      })

      .addCase(addProduct.pending, (state) => {
        state.loading.addProduct = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading.addProduct = false;
        state.products.unshift(action.payload.data);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading.addProduct = false;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload;
        state.products = state.products.filter(
          (product) => product._id !== productId
        );
      })

      .addCase(editProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.data;
        const productId = updatedProduct._id;

        const index = state.products.findIndex(
          (product) => product._id === productId
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      });
  },
});

// export const {} = sellerSlice.actions;
export default sellerSlice.reducer;
