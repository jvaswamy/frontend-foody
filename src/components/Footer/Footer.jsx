import React from "react";
import { assets } from "../../assets/assets";
import { GrRestaurant } from "react-icons/gr";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="logo-container" aria-hidden>
            <GrRestaurant className="restaurant-logo" />
            <span className="logo-text">
              <h2>Foody</h2>
            </span>
          </div>
          <p>
            Foody is a simple, fast way to discover and order delicious meals
            from local restaurants. We deliver fresh food to your doorstep with
            care and speed.
          </p>

          <div className="footer-social-icons" aria-label="social links">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <nav className="footer-content-center" aria-label="footer navigation">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#delivery">Delivery</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </nav>

        <div className="footer-content-right">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href="tel:+911234567890">+91 12345 67890</a>
            </li>
            <li>
              <a href="mailto:support@foody.com">support@foody.com</a>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {year} Foody. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
