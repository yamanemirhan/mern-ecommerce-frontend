import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerAPI, loginAPI, logoutAPI } from "../services/api/auth.js";
import newToast from "../services/toast/toast.js";

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("ecommerce")) || null,
  loading: {
    register: false,
    login: false,
  },
  error: {
    register: null,
    login: null,
  },
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await registerAPI(user);
      const result = response.data;
      newToast(result.message, "green");
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      const showMessage = errorMessage.split(":");
      newToast(showMessage[showMessage.length - 1].trim(), "red");
      return thunkAPI.rejectWithValue(
        showMessage[showMessage.length - 1].trim()
      );
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await loginAPI(user);
    const result = response.data;
    newToast(result.message, "green");
    localStorage.setItem("ecommerce", JSON.stringify(result.data));
    return result;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
    newToast(errorMessage, "red");
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (data = null, thunkAPI) => {
    try {
      const response = await logoutAPI();
      const result = response.data;
      newToast(result.message, "red");
      localStorage.removeItem("ecommerce");
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      newToast(errorMessage, "red");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading.register = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading.register = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading.register = false;
      })

      .addCase(login.pending, (state) => {
        state.loading.login = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading.login = false;
        state.isLoggedIn = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading.login = false;
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = null;
      });
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
