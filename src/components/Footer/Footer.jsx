import React from "react";
import { assets } from "../../assets/assets";
import { GrRestaurant } from "react-icons/gr";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="logo-container">
            <GrRestaurant className="restaurant-logo" />
            <span className="logo-text">
              <h2>Foody</h2>
            </span>
          </div>
          {/* <img src={assets.logo} alt="" /> */}
          <p>
            this is dummu data for printing logo what's app twitter.so later i
            modify this text.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privarcy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 0000000000</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2026 foody.com - All Right Reserved.
      </p>
    </div>
  );
}

export default Footer;
