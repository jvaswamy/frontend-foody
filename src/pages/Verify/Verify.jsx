import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import { DiJava } from "react-icons/di";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

function Verify() {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { API_URL } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(API_URL + "/api/order/verify", {
        success,
        orderId,
      });
      if (response.data.success) {
        toast.success("Payment successful — redirecting to My Orders.");
        navigate("/myorders");
      } else {
        toast.error("Payment not completed.");
        navigate("/");
      }
    } catch (err) {
      console.error("verifyPayment error:", err);
      toast.error("Payment verification failed.");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
