import { useMemo, useState } from "react";
import { FiGift, FiHelpCircle, FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import restaurants from "../../../data/restaurants.json";
import { getSearchSuggestions } from "../../../utils/search";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

  const suggestions = useMemo(() => getSearchSuggestions(restaurants, searchTerm), [searchTerm]);

  const handleSignInClick = () => {
    if (isAuthenticated) {
      setIsAuthMenuOpen((open) => !open);
      return;
    }
    navigate("/login");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  const handleSuggestionClick = (value) => {
    setSearchTerm(value);
    navigate(`/search?q=${encodeURIComponent(value)}`);
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsAuthMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand" aria-label="Foody home">
          <span className="header__logo">F</span>
          <span>
            <strong>Foody</strong>
            <small>Food delivery in Hyderabad</small>
          </span>
        </Link>

        <nav className="header__nav">
          <button
            type="button"
            className="header__nav-item"
            onClick={() => setIsSearchOpen((open) => !open)}
            aria-expanded={isSearchOpen}
            aria-label="Open search"
          >
            <FiSearch />
            <span>Search</span>
          </button>
          <button type="button" className="header__nav-item">
            <FiGift />
            <span>Offers</span>
          </button>
          <button type="button" className="header__nav-item">
            <FiHelpCircle />
            <span>Help</span>
          </button>
          <button type="button" className="header__nav-item" onClick={handleSignInClick}>
            <FiUser />
            <span>{isAuthenticated ? user?.name?.split(" ")[0] || "Logout" : "Sign In"}</span>
          </button>
          <NavLink to="/cart" className="header__nav-item header__nav-item--cart">
            <FiShoppingCart />
            <span>Cart</span>
            {totalItems > 0 && <span className="header__badge">{totalItems}</span>}
          </NavLink>
        </nav>
      </div>

      {isSearchOpen && (
        <div className="header__search-panel">
          <div className="header__search-box">
            <form className="header__search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search restaurants, cuisines, or menu items"
                autoFocus
                aria-autocomplete="list"
                aria-expanded={suggestions.length > 0}
              />
              <button
                type="button"
                className="header__icon-button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <FiX />
              </button>
            </form>

            {searchTerm.trim() && suggestions.length > 0 && (
              <div className="header__suggestions" role="listbox" aria-label="Search suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    key={`${suggestion.type}:${suggestion.value}`}
                    type="button"
                    className="header__suggestion"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSuggestionClick(suggestion.value)}
                  >
                    <span className="header__suggestion-icon">
                      {suggestion.type === "item" ? "Item" : suggestion.type === "cuisine" ? "Cuisine" : "Place"}
                    </span>
                    <span className="header__suggestion-text">
                      <strong>{suggestion.label}</strong>
                      <small>{suggestion.subLabel}</small>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isAuthenticated && isAuthMenuOpen && (
        <div className="header__auth-menu">
          <strong>{user?.name}</strong>
          <span>{user?.email}</span>
          <button type="button" className="header__auth-action" onClick={() => navigate("/cart")}>
            My Cart
          </button>
          <button type="button" className="header__auth-action" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
