import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants.js";

import { getSingleProductAPI } from "../services/api/product";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantityCart,
  increaseQuantityCart,
} from "../features/userSlice";
import Comments from "../components/Comments";

const Product = () => {
  const [productLoading, setProductLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [comments, setComments] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  const { productId } = useParams();

  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.user);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    try {
      const fetchProduct = async () => {
        setProductLoading(true); // Loading başladı
        const res = await getSingleProductAPI(productId);
        if (res.data.success) {
          setProduct(res.data.data.product);
          setComments(res.data.data.comments);
        }
        setProductLoading(false); // Loading tamamlandı
      };
      fetchProduct();
    } catch (error) {
      console.log(error);
      setProductLoading(false); // Loading tamamlandı (hata durumunda da)
    }
  }, [productId]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const selectedProduct = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCart(selectedProduct));
  };

  const productQuantity = cart.filter((item) => item._id === product._id)[0]
    ?.quantity;

  const decreaseQuantity = (e, productId) => {
    e.preventDefault();
    dispatch(decreaseQuantityCart(productId));
  };

  const increaseQuantity = (e, productId) => {
    e.preventDefault();
    dispatch(increaseQuantityCart(productId));
  };

  return (
    <>
      {productLoading ? (
        <div className="text-white text-3xl p-10">Loading...</div>
      ) : (
        <div className="text-white md:max-w-3xl xl:max-w-6xl md:mx-auto">
          <div className="flex flex-col gap-3 p-3">
            {product?.img ? (
              <img
                src={`${BASE_URL}/images/${product.img}`}
                alt={product.name}
                className="w-[400px] h-[500px] object-cover mx-auto"
              />
            ) : (
              <img
                src="https://powermaccenter.com/images/products_attr_img/matrix/default.png"
                alt={product.name}
                className="w-[400px] h-[500px] object-cover mx-auto"
              />
            )}
            <div className="flex items-center gap-1">
              {product?.seller?.product ? (
                <img
                  src={product.seller.profilePicture}
                  alt={product.seller.company}
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <img
                  src="https://avatars.mds.yandex.net/i?id=438af819eb4449ee36013e85faf8758151cbbc2e-9066083-images-thumbs&n=13"
                  alt={product.seller?.company}
                  className="w-10 h-10 object-cover rounded-full"
                />
              )}

              <span>{product.seller?.company}</span>
            </div>
            <h2 className="text-3xl text-center">{product.name}</h2>
            <div className="flex items-center">
              <AiFillStar size={25} color="yellow" />
              <span className="text-2xl ml-1">{product.star}</span>
            </div>
            <p>{product.desc}</p>
            <span className="text-center text-lg">${product.price}</span>
            {/* Sepette olup olmadığına göre değişecek */}
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
                  className="border py-3 px-8 bg-blue-600 rounded-md hover:scale-105 duration-500 text-lg"
                >
                  Add to Cart
                </button>
              )}
            </div>

            {/* Product Detail */}
            <div className="flex flex-col">
              <h2 className="text-2xl">Product Details</h2>
              <p>{product.detail}</p>
            </div>
            {/* Product Reviews */}
            <div className="flex flex-col gap-1 mt-3">
              <h2 className="text-2xl">Reviews ({product.comments?.length})</h2>
              <select
                id="sort"
                onChange={handleSortChange}
                value={sortOption}
                className="text-black"
              >
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
                <option value="highest">Highest to Lowest Rating</option>
                <option value="lowest">Lowest to Highest Rating</option>
              </select>
              <Comments comments={comments} sortOption={sortOption} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
