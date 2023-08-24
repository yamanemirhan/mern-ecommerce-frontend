import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./features/userSlice";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUser()).then((res) => {
        if (res.payload.success) {
          if (res.payload.data.role === "seller") {
            navigate("/seller");
          }
          if (res.payload.data.role === "admin") {
            navigate("/admin");
          }
        }
      });
    }
  }, [dispatch, isLoggedIn, navigate]);

  return (
    <>
      <div>
        <Navbar />
        <main className="pt-20 bg-slate-500 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
