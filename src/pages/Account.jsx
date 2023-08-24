import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrLocation } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { editDetails } from "../features/userSlice";
import newToast from "../services/toast/toast";
import { BASE_URL } from "../constants";

const Account = () => {
  const [formData, setFormData] = useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    addresses: [],
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [activeAddressIndex, setActiveAddressIndex] = useState(0);

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
        addresses: user?.addresses || [],
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

  const handleAddAddress = (e) => {
    e.preventDefault();

    const data = new FormData();

    const newAddress = {
      title: formData["address.title"],
      neighborhood: formData["address.neighborhood"],
      district: formData["address.district"],
      city: formData["address.city"],
      street: formData["address.street"],
      buildingNumber: formData["address.buildingNumber"],
      apartmentNumber: formData["address.apartmentNumber"],
    };

    const requestData = {
      address: newAddress,
    };

    data.append("user_data", JSON.stringify(requestData));

    dispatch(editDetails(data))
      .then((response) => {
        if (response.payload.success) {
          setShowAddAddress(false);
          newToast(response.payload.message, "green");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses.splice(index, 1);

    const data = new FormData();

    const requestData = {
      addresses: updatedAddresses,
    };

    data.append("user_data", JSON.stringify(requestData));

    dispatch(editDetails(data))
      .then((response) => {
        if (response.payload.success) {
          newToast(response.payload.message, "red");
          if (index >= activeAddressIndex && activeAddressIndex > 0) {
            setActiveAddressIndex(activeAddressIndex - 1);
          }
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
          <h2 className="my-4 text-3xl text-center">Account</h2>
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
            <button
              onClick={handleSaveInfos}
              className="border py-2 bg-blue-400 font-medium rounded-sm my-2 hover:scale-105 duration-500"
            >
              Save
            </button>
            <div className="flex flex-col">
              <h4 className="text-xl font-bold mb-2">My Addresses</h4>
              <Carousel
                className="border p-2 flex bg-green-500 rounded-md"
                showThumbs={false}
                selectedItem={activeAddressIndex}
                onChange={(index) => setActiveAddressIndex(index)}
              >
                {formData.addresses?.map((address, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-3 relative"
                  >
                    <AiFillDelete
                      onClick={() => handleDeleteAddress(index)}
                      size={25}
                      color="red"
                      className="absolute top-0 left-8 cursor-pointer"
                    />
                    <div className="flex items-center mb-2">
                      <GrLocation size={25} className="mr-2" />
                      {address.title}
                    </div>
                    <div className="text-center mb-2">
                      {address.neighborhood}, {address.district}, {address.city}
                    </div>
                    <div className="text-center">
                      {address.street}, Building No: {address.buildingNumber},
                      Apartment No: {address.apartmentNumber}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            <div
              onClick={() => setShowAddAddress(!showAddAddress)}
              className="cursor-pointer py-1 px-3 rounded-xl bg-gray-200 text-lg border w-fit"
            >
              Add Address
            </div>
            {showAddAddress && (
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                  <label htmlFor="address.title">Address Title</label>
                  <input
                    onChange={handleInputChange}
                    name="address.title"
                    type="text"
                    required
                    value={formData.addresses.title}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address.neighborhood">Neighborhood</label>
                  <input
                    onChange={handleInputChange}
                    name="address.neighborhood"
                    type="text"
                    required
                    value={formData.addresses.neighborhood}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address.district">District</label>
                  <input
                    onChange={handleInputChange}
                    name="address.district"
                    type="text"
                    required
                    value={formData.addresses.district}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address.city">City</label>
                  <input
                    onChange={handleInputChange}
                    name="address.city"
                    type="text"
                    required
                    value={formData.addresses.city}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address.street">Street</label>
                  <input
                    onChange={handleInputChange}
                    name="address.street"
                    type="text"
                    required
                    value={formData.addresses.street}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address.buildingNumber">
                    Building Number
                  </label>
                  <input
                    onChange={handleInputChange}
                    name="address.buildingNumber"
                    type="text"
                    required
                    value={formData.addresses.buildingNumber}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address.apartmentNumber">
                    Apartment Number
                  </label>
                  <input
                    onChange={handleInputChange}
                    name="address.apartmentNumber"
                    type="text"
                    required
                    value={formData.addresses.apartmentNumber}
                  />
                </div>

                <button
                  onClick={handleAddAddress}
                  className="border bg-yellow-300 py-1 px-6 my-2 rounded-md w-fit ml-auto"
                >
                  Add
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default Account;
