import React, { useContext } from "react";
import "./FoodDisply.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisply = ({ category }) => {
  const { food_list, foodLoading } = useContext(StoreContext);
  return (
    <div className="food-disply" id="food-disply">
      <h2>Top dishes near you</h2>
      <div className="food-disply-list">
        {food_list.map((item, index) => {
          if (category === "All" || item.category === category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            );
          }
        })}
      </div>

      {foodLoading && (
        <div className="food-loading-overlay">
          <div className="food-loading-popup">
            <div className="spinner" />
            <p>
              “This app is hosted on the Render platform, so the first backend
              request may take a little longer because the server needs to wake
              up. After that, it works faster.”
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDisply;
