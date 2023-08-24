import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineDelete,
  AiOutlineEdit,
  AiFillStar,
} from "react-icons/ai";
import {
  addToCart,
  decreaseQuantityCart,
  favProduct,
  increaseQuantityCart,
} from "../features/userSlice";
import newToast from "../services/toast/toast";
import { BASE_URL } from "../constants";
import { deleteProduct } from "../features/sellerSlice";

const ProductCard = ({
  product,
  removeUnlikedProduct,
  isSeller,
  setShowEditProduct,
  setSelectedProduct,
  setProducts,
  products,
  setCurrentPage,
  currentPage,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const { cart, user } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const isLiked = user?.favProducts?.some(
    (productId) => productId === product?._id
  );

  const dispatch = useDispatch();

  const productQuantity = cart.filter((item) => item._id === product._id)[0]
    ?.quantity;

  const handleAddToCart = (e) => {
    e.preventDefault();
    const selectedProduct = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCart(selectedProduct));
  };

  const decreaseQuantity = (e, productId) => {
    e.preventDefault();
    dispatch(decreaseQuantityCart(productId));
  };

  const increaseQuantity = (e, productId) => {
    e.preventDefault();
    dispatch(increaseQuantityCart(productId));
  };

  const handleFavProduct = (e, productId) => {
    e.preventDefault();
    dispatch(favProduct(productId))
      .then((response) => {
        if (response.payload.success) {
          newToast(response.payload.message, "blue");
          if (removeUnlikedProduct) {
            removeUnlikedProduct(e, product._id);
          }
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleDeleteProduct = (e, productId) => {
    e.preventDefault();

    dispatch(deleteProduct(productId))
      .then((response) => {
        if (response.payload.success) {
          newToast(response.payload.message, "blue");
          const id = product?._id;
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== id)
          );
          // Sayfa numarasını güncelle
          if (products.length === 1 && currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
          }
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleEditProduct = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setShowEditProduct(true);
  };

  return (
    <Link
      to={!isSeller ? `/product/${product._id}` : `product/${product._id}`}
      className="border relative text-white rounded-md bg-slate-600 shadow-md shadow-slate-600 cursor-pointer hover:scale-105 duration-500"
    >
      {showConfirmDelete && (
        <div className="absolute border top-0 bg-slate-500 rounded-md p-5 m-2 z-50 text-black shadow-md shadow-slate-600">
          <p className="text-white">
            Are you sure you want to delete this product?
          </p>
          <div className="flex items-center justify-around mt-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowConfirmDelete(false);
              }}
              className="border p-1 bg-blue-200 text-blue-600 rounded-sm"
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleDeleteProduct(e, product._id)}
              className="border p-1 bg-red-200 text-red-600 rounded-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <div>
        {product?.img ? (
          <img
            src={`${BASE_URL}/images/${product?.img}`}
            alt={product.name}
            className="w-72 h-80 object-cover rounded-t-md"
          />
        ) : (
          <img
            src="https://powermaccenter.com/images/products_attr_img/matrix/default.png"
            alt={product.name}
            className="w-72 h-80 object-cover rounded-t-md"
          />
        )}
      </div>
      <div className="flex flex-col gap-3 p-1">
        <div className="flex items-center gap-1">
          {product?.seller?.profilePicture ? (
            <img
              src={`${BASE_URL}/images/${product.seller.profilePicture}`}
              alt={product.seller.company}
              className="w-8 h-8 object-cover rounded-full"
            />
          ) : (
            <img
              src="https://avatars.mds.yandex.net/i?id=438af819eb4449ee36013e85faf8758151cbbc2e-9066083-images-thumbs&n=13"
              alt={product.seller.company}
              className="w-8 h-8 object-cover rounded-full"
            />
          )}

          <span>{product.seller.company}</span>
          {!isSeller && isLoggedIn ? (
            isLiked ? (
              <AiFillHeart
                onClick={(e) => handleFavProduct(e, product._id)}
                size={30}
                className="ml-auto text-red-500"
              />
            ) : (
              <AiOutlineHeart
                onClick={(e) => handleFavProduct(e, product._id)}
                size={30}
                className="ml-auto"
              />
            )
          ) : null}
        </div>
        <div className="flex items-center justify-between mx-1">
          {isSeller && (
            <AiOutlineDelete
              onClick={(e) => {
                e.preventDefault();
                setShowConfirmDelete(true);
              }}
              size={20}
              className="text-red-500"
            />
          )}
          <div className="text-center">{product.name}</div>
          {isSeller && (
            <AiOutlineEdit
              onClick={(e) => handleEditProduct(e, product)}
              size={20}
              className="text-blue-500"
            />
          )}
        </div>
        <div className="flex justify-between items-center mx-2">
          <div className="flex items-center">
            <AiFillStar size={20} color="yellow" />
            <span className="text-xl ml-1">{product.star}</span>
          </div>
          <span>${product.price}</span>
        </div>
        {!isSeller && (
          <div className="text-center mb-2">
            {cart.some((item) => item._id === product._id) ? (
              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={(e) => decreaseQuantity(e, product._id)}
                  className="border rounded-sm w-9 h-9 bg-red-400"
                >
                  -
                </button>
                <span className="text-xl rounded-full border py-1 px-3">
                  {productQuantity}
                </span>
                <button
                  onClick={(e) => increaseQuantity(e, product._id)}
                  className="border rounded-md w-9 h-9 bg-blue-400"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => handleAddToCart(e)}
                className="border py-1 px-3 bg-blue-600 rounded-md hover:scale-105 duration-500"
              >
                Add to Cart
              </button>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
