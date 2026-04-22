import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import HomePage from "./pages/Home/Home";
import SearchResultsPage from "./pages/SearchResults/SearchResults";
import RestaurantDetailsPage from "./pages/RestaurantDetails/RestaurantDetails";
import CartPage from "./pages/Cart/Cart";
import LoginPage from "./pages/Login/Login";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
