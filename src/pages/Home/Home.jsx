import { useEffect, useMemo, useRef, useState } from "react";
import { fetchRestaurants } from "../../services/api";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import Pagination from "../../components/Pagination/Pagination";
// import images from "../../../public/images/"
import "./Home.css";

const PAGE_SIZE = 4;

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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

  const topChains = useMemo(() => restaurants.slice(0, 8), [restaurants]);
  const totalPages = Math.ceil(restaurants.length / PAGE_SIZE);
  const paginatedRestaurants = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return restaurants.slice(startIndex, startIndex + PAGE_SIZE);
  }, [restaurants, currentPage]);

  const categories = [
    {
      id: "biryani",

      image: "/images/biryani.avif",
    },
    {
      id: "dosa",

      image: "/images/dosa.avif",
    },

    {
      id: "coffee",

      image: "/images/coffee.avif",
    },
    {
      id: "momos",

      image: "/images/momos.avif",
    },
    {
      id: "pastry",

      image: "/images/pastry.avif",
    },
    {
      id: "pizzas",

      image: "/images/pizzas.avif",
    },
    {
      id: "salad",

      image: "/images/salad.avif",
    },
    {
      id: "shake",

      image: "/images/shake.avif",
    },
  ];

  const listRef = useRef(null);

  const scroll = (dir = "right") => {
    const el = listRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <main className="page-container home-page">
      <section className="home-categories panel">
        <div className="home-categories__head">
          <h2>What's on your mind?</h2>
          <div className="home-categories__nav">
            <button
              aria-label="Scroll left"
              className="btn-ghost icon-btn"
              onClick={() => scroll("left")}
            >
              ◀
            </button>
            <button
              aria-label="Scroll right"
              className="btn-ghost icon-btn"
              onClick={() => scroll("right")}
            >
              ▶
            </button>
          </div>
        </div>

        <div className="home-categories__list" ref={listRef}>
          {categories.map((c) => (
            <div key={c.id} className="home-category">
              <div className="home-category__image">
                <img src={c.image} alt={c.label} />
              </div>
              <div className="home-category__label">{c.label}</div>
            </div>
          ))}
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
            <p className="section-subtitle">
              Use pagination to browse the full list of firms.
            </p>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {isLoading ? (
          <div className="panel empty-state">
            Fetching the full restaurant list...
          </div>
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
