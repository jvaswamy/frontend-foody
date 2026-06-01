import React, { useEffect, useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

function LoginPopup({ setShowLogin }) {
  const [currState, setCurrState] = useState("Login");
  const { API_URL, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = API_URL;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              onChange={onChangeHandler}
              name="userName"
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            onChange={onChangeHandler}
            name="email"
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, i agree to the Terms of Service and Privacy Policy.
          </p>
        </div>
        {currState === "Login" ? (
          <p onClick={() => setCurrState("Sigh Up")}>
            Create a new account?<span>Click here</span>
          </p>
        ) : (
          <p onClick={() => setCurrState("Login")}>
            Already Have an account? <span>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
