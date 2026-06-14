import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import HomePage from "./pages/Home/Home";
import CartPage from "./pages/Cart/Cart";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PlaceOrderPage from "./pages/PlaceOrder/PlaceOrder";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import VerifyPage from "./pages/Verify/Verify";
import MyOrders from "./pages/Myorders/MyOrders";

import { StoreContext } from "./context/StoreContext";

function App() {
  const { showLogin, setShowLogin } = useContext(StoreContext);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<PlaceOrderPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
