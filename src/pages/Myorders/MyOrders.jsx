import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useSearchParams, useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { API_URL, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const response = await axios.post(
      API_URL + "/api/order/userorders",
      {},
      { headers: { token } },
    );

    setData(response.data.data);
  };

  useEffect(() => {
    const handleStripeRedirect = async () => {
      const success = searchParams.get("success");
      const orderId = searchParams.get("orderId");
      if (success && orderId) {
        try {
          const resp = await axios.post(API_URL + "/api/order/verify", { success, orderId });
          if (resp.data && resp.data.success) {
            toast.success("Payment successful — order placed.");
          } else {
            toast.error("Payment not completed.");
          }
        } catch (err) {
          console.error("verifyPayment error:", err);
          toast.error("Payment verification failed.");
        }
        // remove query params from URL after processing
        setSearchParams({});
      }
    };

    if (token) {
      handleStripeRedirect().then(() => fetchOrders());
    }
  }, [token, API_URL]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
