import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseQuantityCart,
  increaseQuantityCart,
  removeProductFromCart,
  clearCart,
  addOrder,
} from "../features/userSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BASE_URL } from "../constants.js";
import newToast from "../services/toast/toast";

const Cart = () => {
  const { cart } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalQuantity = cart?.reduce(
    (total, item) => total + parseInt(item.quantity, 10),
    0
  );

  const totalPrice = cart?.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const decreaseQuantity = (productId) => {
    dispatch(decreaseQuantityCart(productId));
  };

  const increaseQuantity = (productId) => {
    dispatch(increaseQuantityCart(productId));
  };

  const removeProduct = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/login");
    }

    const orders = { orders: JSON.parse(localStorage.getItem("cart")) };
    dispatch(addOrder(orders)).then((res) => {
      if (res.payload.success) {
        newToast(res.payload.message, "green");
        navigate("/orders");
      }
    });
  };

  return (
    <>
      {cart.length > 0 ? (
        <div className="text-white text-lg md:w-[60%] lg:w-2/3 2xl:w-1/2 md:mx-auto">
          <h2 className="text-center text-3xl p-2">Your Cart</h2>
          <div className="flex flex-col-reverse md:gap-5 md:flex-row relative">
            {/* left or down */}
            <div className="md:w-3/4 flex flex-col gap-4 my-2">
              <button
                onClick={() => clearCartItems()}
                className="text-start mt-2 ml-4 text-red-400 text-base"
              >
                Clear Cart
              </button>
              {cart?.map((product) => (
                <div
                  key={product._id}
                  className="flex gap-3 border-b border-b-white p-2"
                >
                  <div>
                    {product?.img ? (
                      <img
                        src={`${BASE_URL}/images/${product.img}`}
                        alt={product.name}
                        className="w-32 h-40 object-cover"
                      />
                    ) : (
                      <img
                        src="https://powermaccenter.com/images/products_attr_img/matrix/default.png"
                        alt={product.name}
                        className="w-32 h-40 object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <Link
                      to={`/product/${product._id}`}
                      className="hover:text-xl duration-500"
                    >
                      {product.name.length > 25
                        ? product.name.slice(0, 25) + "..."
                        : product.name}
                    </Link>
                    <span className="text-sm w-44 min-h-[40px]">
                      {product.desc.length > 50
                        ? product.desc.slice(0, 50) + "..."
                        : product.desc}
                    </span>
                    <span>${product.price} (per)</span>
                    <div className="flex items-center gap-1 sm:flex-1">
                      <button
                        onClick={() => decreaseQuantity(product._id)}
                        className="bg-red-400 w-8 rounded-md font-bold"
                      >
                        -
                      </button>
                      <span className="rounded-full bg-slate-400 w-7 text-center">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(product._id)}
                        className="bg-blue-400 w-8 rounded-md font-bold"
                      >
                        +
                      </button>
                      <span className="ml-2 text-xl">
                        ${(product.quantity * product.price).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeProduct(product._id)}
                        className="ml-auto mt-3 text-sm text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* right or up */}
            <div className="md:fixed right-80 md:right-2 xl:right-16 lg:w-80 md:h-fit bg-blue-500 flex flex-col gap-4 p-4 text-xl md:rounded-md">
              <h3 className="text-center text-3xl">Checkout</h3>
              <div className="flex flex-col gap-1 p-4">
                <div className="flex justify-between">
                  Total Quantity: <span>{totalQuantity}</span>
                </div>
                <div className="flex justify-between">
                  Total Price:{" "}
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              {isLoggedIn ? (
                <button
                  onClick={(e) => handleCheckout(e)}
                  className="w-fit mx-auto py-3 px-14 rounded-md bg-yellow-400 text-2xl font-bold"
                >
                  Checkout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="w-fit mx-auto p-3 rounded-md bg-yellow-400 text-2xl font-bold"
                >
                  Login to Checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center flex flex-col gap-10 m-10">
          <h4 className="text-4xl">Your Cart Is Empty</h4>
          <Link
            to="/"
            className="text-5xl hover:text-blue-200 flex items-center justify-center"
          >
            <AiOutlineShoppingCart size={100} /> Start Shopping
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
