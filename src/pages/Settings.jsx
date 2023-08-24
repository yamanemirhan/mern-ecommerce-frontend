import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, deleteAccount } from "../features/userSlice";
import newToast from "../services/toast/toast";
import { logout } from "../features/authSlice";

const Settings = () => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleSave = (e) => {
    e.preventDefault();

    if (password !== passwordAgain) {
      newToast("Passwords do not match", "red");
    } else {
      const data = {
        password,
      };
      dispatch(changePassword(data))
        .then((response) => {
          if (response.payload.success) {
            newToast(response.payload.message, "blue");
            setPassword("");
            setPasswordAgain("");
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const data = {
      password,
    };

    dispatch(deleteAccount(data))
      .then((response) => {
        if (response.payload.success) {
          newToast(response.payload.message, "blue");
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="p-5 max-w-3xl mx-auto text-white">
      <h2 className="my-4 text-3xl text-center">Settings</h2>
      <div className="flex flex-col justify-center items-center gap-8 p-5 w-fit mx-auto mt-40 text-black border rounded-md h-40">
        <div
          onClick={() => setShowChangePassword(true)}
          className="text-rose-400 border-b cursor-pointer"
        >
          Change Password
        </div>
        {showChangePassword && (
          <div className="absolute flex items-center justify-center top-0 bottom-0 left-0 right-0  bg-slate-700 p-2 rounded-md text-white">
            <div className="m-auto w-72">
              <h4 className="text-xl mb-4 text-center text-red-500">
                Change Password
              </h4>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col ">
                  <label htmlFor="password">New Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    required
                    className="text-black"
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="passwordAgain">New Password Again</label>
                  <input
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    type="password"
                    name="passwordAgain"
                    id="passwordAgain"
                    value={passwordAgain}
                    required
                    className="text-black"
                  />
                </div>
              </div>
              <button
                onClick={(e) => handleSave(e)}
                className="rounded-sm py-2 px-8 mt-4 w-full bg-red-900 text-xl font-medium hover:bg-white hover:text-red-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setPassword("");
                  setPasswordAgain("");
                  setShowChangePassword(false);
                }}
                className="rounded-sm  mt-4 mb-1 w-full bg-blue-400 text-xl font-medium hover:bg-white hover:text-blue-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div
          onClick={() => setShowDeleteAccount(true)}
          className="text-rose-400 border-b cursor-pointer"
        >
          Delete Account
        </div>
        {showDeleteAccount && (
          <div className="absolute flex items-center justify-center top-0 bottom-0 left-0 right-0  bg-slate-700 p-2 rounded-md text-white">
            <div className="m-auto w-72">
              <h4 className="text-xl mb-4 text-center text-red-500">
                Delete Account
              </h4>
              <div>
                <label htmlFor="password">Enter your password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  required
                  className="text-black w-full"
                />
              </div>
              <div className="mt-6 mb-2">
                Are you sure to delete your account?
              </div>
              <button
                onClick={(e) => handleDelete(e)}
                className="rounded-sm py-2 px-8 w-full bg-red-900 text-xl font-medium hover:bg-white hover:text-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setPassword("");
                  setPasswordAgain("");
                  setShowDeleteAccount(false);
                }}
                className="rounded-sm  mt-4 mb-1 w-full bg-blue-400 text-xl font-medium hover:bg-white hover:text-blue-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
