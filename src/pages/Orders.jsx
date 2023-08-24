import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Order from "../components/Order";

const Orders = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="p-5 max-w-5xl mx-auto text-white">
      <h2 className="my-4 text-3xl text-center">My Orders</h2>
      <div className="flex flex-col-reverse gap-6">
        {user?.orders?.length === 0 ? (
          <h3 className="text-4xl text-center mt-14 text-red-400">
            You don't have any orders.
          </h3>
        ) : (
          user?.orders?.map((order) => <Order key={order._id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default Orders;
