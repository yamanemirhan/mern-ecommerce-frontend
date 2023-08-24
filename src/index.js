import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

// IMPORT PAGES
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import LikedProducts from "./pages/LikedProducts";
import Orders from "./pages/Orders";
import { Toaster } from "react-hot-toast";
import SellerLayout from "./layouts/SellerLayout";
import SellerHome from "./pages/seller/SellerHome";
import SellerAccount from "./pages/seller/SellerAccount";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerSettings from "./pages/seller/SellerSettings";
import SellerProduct from "./pages/seller/SellerProduct";
import SellerAddProduct from "./pages/seller/SellerAddProduct";
import ForgotPassword from "./pages/ForgotPassword";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminAccount from "./pages/admin/AdminAccount";
import AdminSettings from "./pages/admin/AdminSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "product/:productId",
        element: <Product />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "products/liked",
        element: <LikedProducts />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/seller",
    element: <SellerLayout />,
    children: [
      {
        index: true,
        element: <SellerHome />,
      },
      {
        path: "account",
        element: <SellerAccount />,
      },
      {
        path: "orders",
        element: <SellerOrders />,
      },
      {
        path: "add-product",
        element: <SellerAddProduct />,
      },
      {
        path: "settings",
        element: <SellerSettings />,
      },
      {
        path: "product/:productId",
        element: <SellerProduct />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "account",
        element: <AdminAccount />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
);
