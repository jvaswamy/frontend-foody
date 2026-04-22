import { useEffect, useMemo, useState } from "react";
import { fetchRestaurants } from "../../services/api";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import Pagination from "../../components/Pagination/Pagination";
import "./Home.css";

const PAGE_SIZE = 4;

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    fetchRestaurants().then((data) => {
      if (isMounted) {
        setRestaurants(data);
        setIsLoading(false);
      }
    }).catch(() => {
      if (isMounted) {
        setRestaurants([]);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const topChains = useMemo(() => restaurants.slice(0, 8), [restaurants]);
  const totalPages = Math.ceil(restaurants.length / PAGE_SIZE);
  const paginatedRestaurants = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return restaurants.slice(startIndex, startIndex + PAGE_SIZE);
  }, [restaurants, currentPage]);

  return (
    <main className="page-container home-page">
      <section className="home-page__hero panel">
        <div>
          <span className="home-page__eyebrow">Fast, fresh, and simple</span>
          <h1>Foody brings your favorite Hyderabad restaurants to one place.</h1>
          <p>
            Browse top chains, explore restaurant menus, and add your favorite dishes to cart in a
            clean beginner-friendly interface.
          </p>
        </div>
        <div className="home-page__hero-card">
          <strong>Today&apos;s quick picks</strong>
          <span>{topChains.length} featured restaurants and a full paginated listing below.</span>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Top Restaurant Chains in Hyderabad</h2>
        {isLoading ? (
          <div className="panel empty-state">Loading restaurants...</div>
        ) : (
          <div className="restaurant-grid">
            {topChains.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="home-page__section-head">
          <div>
            <h2 className="section-title">All Restaurants</h2>
            <p className="section-subtitle">Use pagination to browse the full list of firms.</p>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

        {isLoading ? (
          <div className="panel empty-state">Fetching the full restaurant list...</div>
        ) : (
          <div className="restaurant-grid">
            {paginatedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default HomePage;
