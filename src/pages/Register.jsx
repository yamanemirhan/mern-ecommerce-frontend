import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import newToast from "../services/toast/toast";

const Register = () => {
  const [showSellerSection, setShowSellerSection] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    about: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isLoggedIn,
    loading: { register: isLoadingRegister },
  } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const { confirmPassword, ...userData } = formData;

    if (confirmPassword !== formData.password) {
      newToast("Passwords do not match", "red");
      return;
    }

    dispatch(register(userData))
      .then((response) => {
        if (response.payload.success) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="p-3 bg-slate-500 flex items-center justify-center min-h-screen">
      <div className="w-[95%] lg:w-[85%]  rounded-lg bg-slate-400 shadow-md shadow-slate-600 flex lg:flex-row flex-col gap-2 items-center">
        {/* left or up */}
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2022/11/12/07/50/moscow-7586398_640.jpg"
            className="w-[480px] h-[640px] object-cover"
          />
        </div>
        {/* right or down*/}
        <div className="flex-1 lg:h-full flex flex-col gap-2 lg:gap-6">
          <h2 className="text-center text-3xl">Register</h2>
          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-3 text-lg lg:h-full"
          >
            <div className="flex flex-col">
              <input
                required
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="w-[calc(100%-20px)] mx-auto"
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                required
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="w-[calc(100%-20px)] mx-auto"
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                required
                value={formData.email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-[calc(100%-20px)] mx-auto"
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                required
                value={formData.password}
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-[calc(100%-20px)] mx-auto"
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-[calc(100%-20px)] mx-auto"
              />
            </div>
            <div
              onClick={() => setShowSellerSection(!showSellerSection)}
              className="text-gray-700 cursor-pointer p-2"
            >
              I want to be seller
            </div>
            {showSellerSection && (
              <>
                <div className="flex flex-col gap-1">
                  <label htmlFor="company" className="text-center">
                    Company Name
                  </label>
                  <input
                    required
                    value={formData.company}
                    onChange={handleChange}
                    type="text"
                    id="company"
                    name="company"
                    className="w-[calc(100%-20px)] mx-auto"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="about" className="text-center">
                    About
                  </label>
                  <input
                    required
                    value={formData.about}
                    onChange={handleChange}
                    type="text"
                    id="about"
                    name="about"
                    className="w-[calc(100%-20px)] mx-auto"
                  />
                </div>
              </>
            )}
            <button
              disabled={isLoadingRegister}
              type="submit"
              className=" bg-slate-600 font-semibold text-white w-fit mx-auto lg:mt-3 py-2 px-10 rounded-lg"
            >
              {isLoadingRegister ? "Registering..." : "Register"}
            </button>
            <div className="lg:mt-4 text-center text-base">
              Already have an account?{" "}
              <Link to="/login" className="font-bold">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
