import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

import { API_URL } from "../data/apiPath";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, _setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [foodLoading, setFoodLoading] = useState(false);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        API_URL + "/api/cart/add",
        { itemId },
        { headers: { token } },
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        API_URL + "/api/cart/remove",
        { itemId },
        { headers: { token } },
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = food_list.find((product) => product._id === itemId);
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  const setToken = (val) => {
    if (val) {
      Cookies.set("token", val, { expires: 7, sameSite: "lax" });
      _setToken(val);
    } else {
      Cookies.remove("token");
      _setToken("");
    }
  };

  const contextValue = {
    food_list,
    foodLoading,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    API_URL,
    token,
    setToken,
  };

  const fetchFoodList = async () => {
    try {
      setFoodLoading(true);
      const response = await axios.get(API_URL + "/api/food/list");
      setFoodList(response.data.data);
    } catch (e) {
      console.error("Failed to fetch food list", e);
      setFoodList([]);
    } finally {
      setFoodLoading(false);
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      API_URL + "/api/cart/items",
      {},
      { headers: { token } },
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const cookieToken = Cookies.get("token");
      if (cookieToken) {
        setToken(cookieToken);
        await loadCartData(cookieToken);
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
