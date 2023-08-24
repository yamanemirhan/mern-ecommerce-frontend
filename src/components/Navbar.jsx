import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { CiUser, CiSettings, CiDeliveryTruck } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../features/userSlice";
import { logout } from "../features/authSlice";
import { BASE_URL } from "../constants";

const Navbar = () => {
  const [showMoreProfile, setShowMoreProfile] = useState(false);
  const [showMoreCart, setShowMoreCart] = useState(false);

  const dispatch = useDispatch();

  const { user, cart } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const showCartItems = cart?.slice(0, 3);

  const showProfileItems = [
    {
      id: 1,
      icon: <CiUser size={30} />,
      title: "Account",
      to: "/account",
    },
    {
      id: 2,
      icon: <CiDeliveryTruck size={30} />,
      title: "My Orders",
      to: "/orders",
    },
    {
      id: 3,
      icon: <AiOutlineHeart size={30} />,
      title: "Liked Products",
      to: `/products/liked`,
    },
    {
      id: 4,
      icon: <CiSettings size={30} />,
      title: "Settings",
      to: "/settings",
    },
  ];

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart && cart.length > 0 && dispatch(getCart(cart));
  }, [dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

  return (
    <nav className="fixed z-40 w-full h-20 flex bg-slate-600 text-white">
      <div className="w-full flex justify-between sm:justify-around items-center px-2">
        {/* left */}
        <h1 className="uppercase">
          <Link to="/">Ecommerce</Link>
        </h1>
        {/* right */}
        <div className="flex items-center gap-10">
          <div
            onClick={() => {
              setShowMoreCart(!showMoreCart);
              setShowMoreProfile(false);
            }}
            className="relative cursor-pointer"
          >
            <AiOutlineShoppingCart size={30} />
            <span className="absolute -top-2 -right-4 w-6 h-6 bg-rose-400 rounded-full flex justify-center items-center">
              {cart.length}
            </span>
            {showMoreCart && cart.length > 0 && (
              <div className="absolute top-11 -right-20 sm:-right-10 rounded-lg p-2 flex flex-col gap-2 bg-slate-400 w-64 ">
                <div className="flex flex-col gap-2 p-1 border-b">
                  {showCartItems.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      className="flex justify-between items-center hover:bg-slate-500 rounded-md"
                    >
                      <div className="bg-red-500">
                        {product?.img ? (
                          <img
                            src={`${BASE_URL}/images/${product.img}`}
                            alt={product.name}
                            className="w-10 h-10 object-cover"
                          />
                        ) : (
                          <img
                            src="https://powermaccenter.com/images/products_attr_img/matrix/default.png"
                            alt={product.name}
                            className="w-10 h-10 object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <div>{product.name}</div>
                        <div className="ml-auto text-yellow-400 text-sm">
                          ${product.price} (per)
                        </div>
                        <div className="ml-auto text-gray-200 text-xs">
                          Quantity: {product.quantity}
                        </div>
                      </div>
                    </Link>
                  ))}
                  {cart.length > 3 && (
                    <div className="ml-auto text-gray-200">
                      +{cart.length - 3} more
                    </div>
                  )}
                </div>
                <div className="m-auto bg-rose-500 rounded-md py-1 px-4 font-semibold hover:bg-rose-400">
                  <Link to="/cart">Go to Cart</Link>
                </div>
              </div>
            )}
          </div>
          {isLoggedIn ? (
            <div
              onClick={() => {
                setShowMoreProfile(!showMoreProfile);
                setShowMoreCart(false);
              }}
              className="relative flex items-center gap-1 cursor-pointer"
            >
              {user?.profilePicture ? (
                <img
                  src={`${BASE_URL}/images/${user.profilePicture}`}
                  alt={user?.firstName}
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <AiOutlineUser size={30} className="border rounded-full" />
              )}

              <span className="text-sm sm:text-base">
                {user?.firstName + " " + user?.lastName}
              </span>
              {showMoreProfile && (
                <div className="absolute top-12 sm:-right-8 right-4 rounded-lg p-2 bg-slate-400 w-40">
                  <div className="flex flex-col gap-3">
                    {showProfileItems.map((i) => (
                      <Link
                        key={i.id}
                        to={i.to}
                        className="flex items-center hover:bg-slate-500 rounded-md"
                      >
                        <div className="flex items-center gap-1">
                          {i.icon}
                          <span>{i.title}</span>
                        </div>
                      </Link>
                    ))}
                    <div
                      onClick={(e) => handleLogout(e)}
                      className="flex items-center gap-1 text-red-500 hover:bg-slate-500 rounded-md"
                    >
                      <AiOutlineLogout size={30} /> Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">Login</Link>
              <span>|</span>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
