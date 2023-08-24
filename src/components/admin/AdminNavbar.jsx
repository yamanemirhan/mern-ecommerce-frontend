import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { MdOutlineAddBox } from "react-icons/md";
import { CiUser, CiSettings, CiDeliveryTruck } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../features/userSlice";
import { logout } from "../../features/authSlice";
import { BASE_URL } from "../../constants.js";

const AdminNavbar = () => {
  const [showMoreProfile, setShowMoreProfile] = useState(false);

  const dispatch = useDispatch();

  const {
    user,
    loading: { getUser },
  } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const showProfileItems = [
    {
      id: 1,
      icon: <CiUser size={30} />,
      title: "Account",
      to: "/admin/account",
    },
    {
      id: 2,
      icon: <CiSettings size={30} />,
      title: "Settings",
      to: "/admin/settings",
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
    <nav className="fixed z-50 w-full h-20 flex bg-slate-600 text-white">
      <div className="w-full flex justify-between sm:justify-around items-center px-2">
        {/* left */}
        <h1 className="uppercase">
          <Link to="/">Ecommerce</Link>
        </h1>
        {/* right */}
        <div className="flex items-center gap-10">
          {isLoggedIn ? (
            <div
              onClick={() => {
                setShowMoreProfile(!showMoreProfile);
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

              {!getUser && (
                <span className="text-sm sm:text-base">
                  {user?.firstName + " " + user?.lastName}
                </span>
              )}
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

export default AdminNavbar;
