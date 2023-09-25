import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../features/sellerSlice";
import newToast from "../../services/toast/toast";
import { BASE_URL } from "../../constants";

function SellerEditProductModal({ onClose, selectedProduct, header }) {
  const [formData, setFormData] = useState({
    img: selectedProduct?.img || "",
    name: selectedProduct?.name || "",
    desc: selectedProduct?.desc || "",
    category: selectedProduct?.category || "",
    detail: selectedProduct?.detail || "",
    price: selectedProduct?.price || "",
    stock: selectedProduct?.stock || "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  const dispatch = useDispatch();

  const categories = ["Phone", "Computer", "Laptop", "Tablet"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img" && files && files.length) {
      const selectedFile = files[0];

      // Set preview image for the selected file
      setPreviewImage(URL.createObjectURL(selectedFile));

      setFormData((prevData) => ({
        ...prevData,
        img: selectedFile,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("product_image", formData.img);

    const productData = {
      name: formData.name,
      desc: formData.desc,
      category: formData.category,
      detail: formData.detail,
      price: formData.price,
      stock: formData.stock,
    };
    data.append("product_data", JSON.stringify(productData));

    if (header === "Add") {
      dispatch(addProduct(data))
        .then((response) => {
          if (response.payload.success) {
            newToast(response.payload.message, "green");
            setPreviewImage("");
            setFormData({
              img: "",
              name: "",
              desc: "",
              category: "",
              detail: "",
              price: "",
              stock: "",
            });
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      dispatch(editProduct({ data, id: selectedProduct._id }))
        .then((response) => {
          if (response.payload.success) {
            newToast(response.payload.message, "green");
            setPreviewImage("");
            setFormData({
              img: "",
              name: "",
              desc: "",
              category: "",
              detail: "",
              price: "",
              stock: "",
            });
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  return (
    <div className="fixed xl:h-[620px] rounded-lg shadow-md shadow-gray-400 inset-0 flex max-w-[95%] xl:w-[1400px] z-40 bg-slate-400 m-auto">
      <div className="bg-gray-300 w-full p-5 rounded-lg relative">
        <h2 className="text-3xl text-center text-black">{header} Product</h2>
        {header === "Edit" && (
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 text-gray-600"
          >
            <AiOutlineClose size={30} />
          </button>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col items-center xl:flex-row gap-3">
            <div className="relative  xl:flex-1">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt={formData.name}
                  className="xl:w-[700px] xl:h-[450px] md:w-[500px] md:h-[340px] w-full h-[220px] object-cover"
                />
              ) : formData.img ? (
                <img
                  src={`${BASE_URL}/images/${formData?.img}`}
                  alt={formData.name}
                  className="xl:w-[700px] xl:h-[450px] md:w-[500px] md:h-[340px] w-full h-[220px] object-cover"
                />
              ) : (
                <img
                  src="https://powermaccenter.com/images/products_attr_img/matrix/default.png"
                  alt={formData.name}
                  className="xl:w-[700px] xl:h-[450px] md:w-[500px] md:h-[340px] w-full h-[220px] object-cover"
                />
              )}
              <input
                onChange={handleChange}
                name="img"
                type="file"
                className="absolute top-0 h-full w-full rounded-full opacity-0 cursor-pointer z-10"
              />
              <div className="absolute top-1/2 text-center w-full text-gray-500 cursor-pointer">
                Change Picture
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full flex-1">
              <div className="flex flex-col w-full">
                <label htmlFor="name">Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="desc">Description</label>
                <input
                  required
                  value={formData.desc}
                  onChange={handleChange}
                  type="text"
                  id="desc"
                  name="desc"
                  className=""
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="category">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="text-black"
                  id="category"
                  name="category"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="detail">Detail</label>
                <textarea
                  rows={4}
                  required
                  value={formData.detail}
                  onChange={handleChange}
                  type="text"
                  id="detail"
                  name="detail"
                  className="resize-none"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="price">Price</label>
                <input
                  required
                  min={0}
                  value={formData.price}
                  onChange={handleChange}
                  type="number"
                  id="price"
                  name="price"
                  className=""
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="stock">Stock</label>
                <input
                  required
                  min={0}
                  value={formData.stock}
                  onChange={handleChange}
                  type="number"
                  id="stock"
                  name="stock"
                  className=""
                />
              </div>
            </div>
          </div>
          <div className="">
            <button className="border py-3 w-full bg-blue-400 hover:bg-blue-600 rounded-md text-white text-2xl xl:mt-2">
              {header === "Add" ? "Add" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerEditProductModal;
