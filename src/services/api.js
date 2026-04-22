import axios from "axios";
import restaurants from "../data/restaurants.json";

const mockAdapter = async (config) => {
  const url = config.url || "";

  if (url === "/restaurants") {
    return {
      data: restaurants,
      status: 200,
      statusText: "OK",
      headers: {},
      config,
      request: {},
    };
  }

  if (url.startsWith("/restaurants/")) {
    const id = Number(url.split("/").pop());
    const restaurant = restaurants.find((item) => item.id === id) || null;

    return {
      data: restaurant,
      status: restaurant ? 200 : 404,
      statusText: restaurant ? "OK" : "Not Found",
      headers: {},
      config,
      request: {},
    };
  }

  return {
    data: null,
    status: 404,
    statusText: "Not Found",
    headers: {},
    config,
    request: {},
  };
};

const api = axios.create({
  baseURL: "/",
  adapter: mockAdapter,
});

export const fetchRestaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data;
};

export const fetchRestaurantById = async (id) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data;
};

export default api;
