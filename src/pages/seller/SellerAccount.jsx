import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editDetails } from "../../features/userSlice";
import newToast from "../../services/toast/toast";
import { BASE_URL } from "../../constants.js";

const SellerAccount = () => {
  const [formData, setFormData] = useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    about: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        profilePicture: user?.profilePicture || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        company: user?.seller?.company || "",
        about: user?.seller?.about || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files && files.length) {
      const selectedFile = files[0];

      // Set preview image for the selected file
      setPreviewImage(URL.createObjectURL(selectedFile));

      setFormData((prevData) => ({
        ...prevData,
        profilePicture: selectedFile,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSaveInfos = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("profile_image", formData.profilePicture);

    const userData = {
      profilePicture: formData?.profilePicture,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      email: formData?.email,
      phoneNumber: formData?.phoneNumber,
      company: formData?.company,
      about: formData?.about,
    };
    data.append("user_data", JSON.stringify(userData));

    dispatch(editDetails(data))
      .then((response) => {
        if (response.payload.success) {
          newToast(response.payload.message, "blue");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <>
      {user && (
        <div className="p-5 max-w-3xl mx-auto text-white">
          <h2 className="my-4 text-3xl text-center">Seller Account</h2>
          <form className="flex flex-col gap-3 text-black">
            <div className="mx-auto relative">
              {previewImage ? ( // Show preview image if available
                <img
                  src={previewImage}
                  alt={user.name}
                  className="w-64 h-64 rounded-full object-cover cursor-pointer"
                />
              ) : user.profilePicture ? (
                <img
                  src={`${BASE_URL}/images/${user.profilePicture}`}
                  alt={user.name}
                  className="w-64 h-64 rounded-full object-cover cursor-pointer"
                />
              ) : (
                <img
                  src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                  alt={user.name}
                  className="w-64 h-64 rounded-full object-cover cursor-pointer"
                />
              )}
              <input
                onChange={handleInputChange}
                name="profilePicture"
                type="file"
                className="absolute top-0 h-full w-full rounded-full opacity-0 cursor-pointer z-10"
              />
              <div className="absolute top-1/2 text-center w-full text-gray-500 cursor-pointer">
                Change Picture
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="firstname">First Name</label>
              <input
                onChange={handleInputChange}
                name="firstName"
                type="text"
                required
                value={formData.firstName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName">Last Name</label>
              <input
                onChange={handleInputChange}
                name="lastName"
                type="text"
                required
                value={formData.lastName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleInputChange}
                name="email"
                type="email"
                required
                value={formData.email}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                onChange={handleInputChange}
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="company">Company Name</label>
              <input
                required
                value={formData.company}
                onChange={handleInputChange}
                type="text"
                id="company"
                name="company"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="about">About</label>
              <input
                required
                value={formData.about}
                onChange={handleInputChange}
                type="text"
                id="about"
                name="about"
              />
            </div>
            <button
              onClick={handleSaveInfos}
              className="border py-2 bg-blue-400 font-medium rounded-sm my-2 hover:scale-105 duration-500"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SellerAccount;
