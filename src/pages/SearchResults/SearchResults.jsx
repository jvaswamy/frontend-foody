import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import { fetchRestaurants } from "../../services/api";
import { getRestaurantMatches } from "../../utils/search";
import "./SearchResults.css";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchRestaurants()
      .then((data) => {
        if (isMounted) {
          setRestaurants(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setRestaurants([]);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const results = useMemo(() => getRestaurantMatches(restaurants, query), [restaurants, query]);

  return (
    <main className="page-container search-results">
      <section className="section">
        <h1 className="section-title">Search Results</h1>
        <p className="section-subtitle">
          {query
            ? `Showing matches for "${query}"`
            : "Search by restaurant name, cuisine, location, or menu item."}
        </p>
      </section>

      {isLoading ? (
        <div className="panel empty-state">Searching restaurants...</div>
      ) : query && results.length > 0 ? (
        <div className="restaurant-grid">
          {results.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <section className="panel empty-state search-results__empty">
          <h2>No matches found</h2>
          <p>Try a different restaurant name, cuisine, location, or menu item.</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </section>
      )}
    </main>
  );
}

export default SearchResultsPage;
