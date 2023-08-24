import React, { useState } from "react";
import newToast from "../services/toast/toast.js";
import { BASE_URL } from "../constants.js";
import { useDispatch } from "react-redux";
import { addComment } from "../features/userSlice.js";
import { Link } from "react-router-dom";

function Order({ order }) {
  const [star, setStar] = useState("");
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleSendComment = (e) => {
    e.preventDefault();

    const data = {
      info: {
        star: star,
        text: text,
        orderId: order._id,
      },
      id: order.productId,
    };
    dispatch(addComment(data)).then((res) => {
      if (res.payload.success) {
        newToast(res.payload.message, "green");
        setStar("");
        setText("");
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between border shadow-md shadow-gray-500 border-gray-400 p-5 bg-gray-600 rounded-lg">
      <div className="flex gap-4 lg:gap-8">
        <div>
          {order?.img ? (
            <img
              src={`${BASE_URL}/images/${order?.img}`}
              alt={order.name}
              className="lg:w-72 lg:h-64 w-40 h-36 object-cover"
            />
          ) : (
            <img
              src="https://avatars.mds.yandex.net/i?id=b3ea01d20dde4b43bddce9a6ace9f59512f17a67-8567697-images-thumbs&n=13"
              alt={order.name}
              className="lg:w-72 lg:h-64 w-40 h-36 object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 lg:gap-4">
          <Link
            to={`/product/${order.productId}`}
            className="lg:text-3xl text-xl"
          >
            {order.name.length > 10
              ? `${order.name.slice(0, 10)}...`
              : order.name}
          </Link>
          <span>${order.price} (per)</span>
          <div className="mb-2">Quantity: {order.unit}</div>
          <span className="mb-3 text-gray-300">
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-1">
            {order?.seller?.profilePicture ? (
              <img
                src={`${BASE_URL}/images/${order?.seller?.profilePicture}`}
                alt={order.seller.company}
                className="lg:w-10 lg:h-10 w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <img
                src="https://avatars.mds.yandex.net/i?id=438af819eb4449ee36013e85faf8758151cbbc2e-9066083-images-thumbs&n=13"
                alt={order.seller.company}
                className="lg:w-10 lg:h-10 w-8 h-8 rounded-full object-cover"
              />
            )}
            <h4>
              {" "}
              {order.seller.company.length > 10
                ? `${order.seller.company.slice(0, 10)}...`
                : order.seller.company}
            </h4>
          </div>
        </div>
      </div>
      <form>
        <div className="w-full text-black">
          <select
            value={star}
            onChange={(e) => setStar(e.target.value)}
            required
            name="star"
            id="star"
          >
            <option>Give a star</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={4}
            placeholder="Add a review..."
            className="w-full p-1 mt-1 rounded-md text-black resize-none"
          />
          <button
            onClick={(e) => handleSendComment(e)}
            className="flex ml-auto mb-3 border py-2 px-6 rounded-md bg-blue-700 hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Order;
