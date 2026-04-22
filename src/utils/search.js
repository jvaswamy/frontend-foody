const normalizeText = (value = "") => String(value).toLowerCase().trim().replace(/\s+/g, " ");

export const getRestaurantSearchText = (restaurant) =>
  normalizeText(
    [
      restaurant.name,
      restaurant.location,
      restaurant.offer,
      ...(restaurant.cuisines || []),
      ...(restaurant.menu || []).flatMap((item) => [item.name, item.description]),
    ]
      .filter(Boolean)
      .join(" ")
  );

export const getRestaurantMatches = (restaurants, query) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  return restaurants.filter((restaurant) => getRestaurantSearchText(restaurant).includes(normalizedQuery));
};

export const getSearchSuggestions = (restaurants, query, limit = 6) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  const suggestions = [];
  const seen = new Set();

  restaurants.forEach((restaurant) => {
    const restaurantName = normalizeText(restaurant.name);
    const restaurantLocation = normalizeText(restaurant.location || "");
    const restaurantCuisines = (restaurant.cuisines || []).map((cuisine) => normalizeText(cuisine));

    const pushSuggestion = (value, label, subLabel, type) => {
      const key = `${type}:${value}`;
      if (seen.has(key) || suggestions.length >= limit) return;
      seen.add(key);
      suggestions.push({ value, label, subLabel, type });
    };

    const matchingCuisine = restaurant.cuisines?.find((cuisine) => normalizeText(cuisine).includes(normalizedQuery));

    if (restaurantName.includes(normalizedQuery) || restaurantLocation.includes(normalizedQuery)) {
      pushSuggestion(restaurant.name, restaurant.name, restaurant.location, "restaurant");
    } else if (matchingCuisine) {
      pushSuggestion(matchingCuisine, matchingCuisine, restaurant.name, "cuisine");
    }

    (restaurant.menu || []).forEach((item) => {
      if (suggestions.length >= limit) return;

      const itemText = normalizeText(`${item.name} ${item.description || ""}`);
      if (itemText.includes(normalizedQuery)) {
        pushSuggestion(item.name, item.name, restaurant.name, "item");
      }
    });
  });

  return suggestions;
};
