import { FiClock, FiMapPin, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./RestaurantCard.css";

function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card">
      <div className="restaurant-card__image-wrap">
        <img src={restaurant.image} alt={restaurant.name} className="restaurant-card__image" />
        <span className="restaurant-card__offer">{restaurant.offer}</span>
      </div>

      <div className="restaurant-card__body">
        <h3>{restaurant.name}</h3>
        <div className="restaurant-card__meta restaurant-card__meta--rating">
          <FiStar />
          <span>{restaurant.rating}</span>
          <span className="restaurant-card__dot">•</span>
          <FiClock />
          <span>{restaurant.deliveryTime}</span>
        </div>
        <p className="restaurant-card__cuisines">{restaurant.cuisines.join(", ")}</p>
        <div className="restaurant-card__location">
          <FiMapPin />
          <span>{restaurant.location}</span>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;
