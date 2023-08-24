import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice";
import SellerNavbar from "../components/seller/SellerNavbar";

const SellerLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUser()).then((res) => {
        if (res.payload.success) {
          if (res.payload.data.role !== "seller") {
            navigate("/");
          }
        }
      });
    } else {
      navigate("/");
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <div>
        <SellerNavbar />
        <main className="pt-20 bg-slate-500 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SellerLayout;
