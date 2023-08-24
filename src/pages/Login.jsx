import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isLoggedIn,
    loading: { login: isLoadingLogin },
  } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login(formData))
      .then((response) => {
        if (response.payload.success) {
          navigate("/");
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
    <div className="h-screen bg-slate-500 flex items-center justify-center">
      <div className="w-[95%] lg:w-[85%] h-[95%] lg:h-[65%] rounded-lg bg-slate-400 shadow-md shadow-slate-600 flex lg:flex-row flex-col gap-2">
        {/* left or up */}
        <div className="h-1/2 lg:h-full w-full lg:w-1/2">
          <img
            src="https://media.istockphoto.com/id/1496678148/tr/foto%C4%9Fraf/exultant-company-employee-with-gadgets-standing-in-empty-office-corridor.jpg?s=612x612&w=0&k=20&c=F5CPlmPmulBfyBXaPbzqgW7ZGWjtHl5NGWZHrogToyE="
            className="w-full h-full object-cover"
          />
        </div>
        {/* right or down*/}
        <div className="flex-1 lg:h-full flex flex-col gap-8 lg:gap-10 lg:pt-28">
          <h2 className="text-center text-3xl">Login</h2>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-3 text-lg lg:h-full"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-center">
                Email
              </label>
              <input
                required
                value={formData.email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                className="w-[calc(100%-20px)] mx-auto"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-center">
                Password
              </label>
              <input
                required
                value={formData.password}
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                className="w-[calc(100%-20px)] mx-auto"
              />
            </div>
            <div className="ml-auto mr-2 text-base">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button
              disabled={isLoadingLogin}
              type="submit"
              className="bg-slate-600 font-semibold text-white w-fit mx-auto lg:mt-3 py-2 px-10 rounded-lg"
            >
              {isLoadingLogin ? "Loginning..." : "Login"}
            </button>
            <div className="lg:mt-4 text-center text-base">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
