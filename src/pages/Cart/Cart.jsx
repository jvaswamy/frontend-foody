import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import CartItem from "../../components/CartItem/CartItem";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import "./Cart.css";

function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    cartItems,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    clearCart();
    window.alert("Your order has been placed successfully!");
    navigate("/");
  };

  return (
    <main className="page-container cart-page">
      <div className="cart-page__header">
        <div>
          <h1 className="section-title">Your Cart</h1>
          <p className="section-subtitle">
            {totalItems} item{totalItems !== 1 ? "s" : ""} ready for checkout.
          </p>
        </div>
        <Link to="/" className="btn btn-secondary">
          Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <section className="panel empty-state">
          <FiShoppingBag className="cart-page__empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Browse restaurants and add delicious items to get started.</p>
          <Link to="/" className="btn btn-primary">
            Explore Restaurants
          </Link>
        </section>
      ) : (
        <div className="cart-page__layout">
          <section className="cart-page__items">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
              />
            ))}
          </section>

          <aside className="cart-page__summary panel">
            <h2>Order Summary</h2>
            <div className="cart-page__row">
              <span>Total items</span>
              <strong>{totalItems}</strong>
            </div>
            <div className="cart-page__row">
              <span>Total price</span>
              <strong>{formatCurrency(totalPrice)}</strong>
            </div>
            <p className="cart-page__note">
              {isAuthenticated
                ? "You are logged in and can place the order now."
                : "You will be redirected to the login page before checkout."}
            </p>
            <button type="button" className="btn btn-primary cart-page__checkout" onClick={handleCheckout}>
              {isAuthenticated ? "Place Order" : "Login to Checkout"}
              <FiArrowRight />
            </button>
            <button type="button" className="btn btn-ghost cart-page__clear" onClick={clearCart}>
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}

export default CartPage;
