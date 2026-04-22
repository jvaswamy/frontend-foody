import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiClock, FiMapPin, FiStar, FiShoppingCart } from "react-icons/fi";
import { fetchRestaurantById } from "../../services/api";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import "./RestaurantDetails.css";

function RestaurantDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchRestaurantById(id).then((data) => {
      if (isMounted) {
        setRestaurant(data);
        setIsLoading(false);
      }
    }).catch(() => {
      if (isMounted) {
        setRestaurant(null);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const menuTotal = useMemo(
    () => restaurant?.menu?.reduce((sum, item) => sum + item.price, 0) || 0,
    [restaurant]
  );

  if (isLoading) {
    return (
      <main className="page-container">
        <div className="panel empty-state">Loading restaurant details...</div>
      </main>
    );
  }

  if (!restaurant) {
    return (
      <main className="page-container">
        <div className="panel empty-state">
          Restaurant not found. <Link to="/">Go back home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container restaurant-details">
      <div className="restaurant-details__back">
        <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          Back
        </button>
        <Link to="/cart" className="btn btn-secondary">
          <FiShoppingCart />
          View Cart
        </Link>
      </div>

      <section className="restaurant-details__hero panel">
        <img src={restaurant.image} alt={restaurant.name} className="restaurant-details__image" />
        <div className="restaurant-details__info">
          <span className="restaurant-details__offer">{restaurant.offer}</span>
          <h1>{restaurant.name}</h1>
          <div className="restaurant-details__meta">
            <span>
              <FiStar /> {restaurant.rating}
            </span>
            <span>
              <FiClock /> {restaurant.deliveryTime}
            </span>
            <span>
              <FiMapPin /> {restaurant.location}
            </span>
          </div>
          <p>{restaurant.cuisines.join(", ")}</p>
          <div className="restaurant-details__summary">
            <strong>{formatCurrency(menuTotal)}</strong>
            <span>Total if you try every item on the menu</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Menu Items</h2>
        <div className="restaurant-details__menu">
          {restaurant.menu.map((item) => (
            <ProductCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default RestaurantDetailsPage;
