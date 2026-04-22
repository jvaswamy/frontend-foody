# Foody

Foody is a simple, clean, responsive food delivery web app built with React. It is inspired by Swiggy and focuses on beginner-friendly code, reusable components, and clear project structure.

The app lets users:

- Browse restaurants in Hyderabad
- View restaurant details and menu items
- Add food items to cart
- Increase, decrease, or remove cart items
- Log in with a simple mock auth flow
- Search restaurants from the header or home page
- Proceed to checkout with login validation

## Tech Stack

- React
- React Router DOM
- Axios
- React Context API
- React Icons
- Plain CSS
- Functional components only

## Project Structure

```txt
src/
├── components/
│   ├── CartItem/
│   ├── Pagination/
│   ├── ProductCard/
│   ├── RestaurantCard/
│   └── layout/
│       └── Header/
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── data/
│   └── restaurants.json
├── pages/
│   ├── Cart/
│   ├── Home/
│   ├── Login/
│   ├── RestaurantDetails/
│   └── SearchResults/
├── services/
│   └── api.js
├── utils/
│   └── formatCurrency.js
├── App.jsx
├── index.css
└── main.jsx
```

## Pages

### Home Page

Route: `/`

What it shows:

- Hero section with a search box
- Quick search chips
- `Top Restaurant Chains in Hyderabad`
- `All Restaurants` with pagination

Behavior:

- First 8 restaurants are shown in the top section
- The all restaurants section uses pagination
- Clicking a restaurant opens its details page

### Restaurant Details Page

Route: `/restaurant/:id`

What it shows:

- Restaurant image and summary
- Rating, cuisine, delivery time, and location
- Menu items
- Add to Cart buttons

### Cart Page

Route: `/cart`

What it shows:

- Cart items
- Quantity controls
- Remove item action
- Total items
- Total price

Behavior:

- Checkout checks login state first
- Logged out users are sent to `/login`

### Login Page

Route: `/login`

What it shows:

- Simple mock login form
- Name and email fields

Behavior:

- Saves mock auth state in `localStorage`
- Redirects back to the requested page after login

### Search Results Page

Route: `/search?q=...`

What it shows:

- Restaurants matching the search query
- Empty state if no matches are found

Behavior:

- Search works from both the header and the home page
- Matches restaurant name, cuisine, location, and offer text

## Main Features

- Responsive header with cart badge
- Restaurant cards with image, rating, cuisine, delivery time, and location
- Restaurant details with menu items
- Global cart state with Context API
- Global auth state with Context API
- Search suggestions in the header
- Search entry box on the home page
- Pagination on restaurant listing
- Clean responsive UI for mobile, tablet, and desktop

## API Handling

The app uses Axios in `src/services/api.js`, but since a real backend is not required, it reads from local JSON data.

Files involved:

- `src/data/restaurants.json`
- `src/services/api.js`

How it works:

- `fetchRestaurants()` returns the full restaurant list
- `fetchRestaurantById(id)` returns a single restaurant
- The service is structured like a real API layer, so it is easy to replace with a backend later

## Context API

### CartContext

File: `src/context/CartContext.jsx`

Responsibilities:

- Store cart items globally
- Add items to cart
- Increase quantity
- Decrease quantity
- Remove items
- Track total items and total price

Persistence:

- Cart state is saved in `localStorage`

### AuthContext

File: `src/context/AuthContext.jsx`

Responsibilities:

- Store login state globally
- Log in mock user data
- Log out user
- Restore auth state from `localStorage`

## Routing

Configured in `src/App.jsx`

- `/` -> Home page
- `/search` -> Search results page
- `/restaurant/:id` -> Restaurant details page
- `/cart` -> Cart page
- `/login` -> Login page

## Search Flow

The app has two search entry points:

1. Header search icon
2. Home page search box

Flow:

- User types a query
- App navigates to `/search?q=...`
- Search results filter restaurants by:
  - restaurant name
  - cuisine
  - location
  - offer

The header also shows live suggestions while typing.

## Cart Flow

Flow:

- User opens a restaurant details page
- Clicks `Add to Cart`
- Cart badge in the header updates immediately
- User can visit `/cart`
- Cart page supports:
  - increase quantity
  - decrease quantity
  - remove item
  - clear cart

## Login Redirect Flow

If the user tries to checkout while logged out:

- They are redirected to `/login`
- After login, they are sent back to the requested page

This is handled using the route state passed by React Router.

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

### 5. Run lint

```bash
npm run lint
```

## Notes

- The app uses mock JSON data instead of a backend service.
- All components are functional components.
- CSS is kept separate per component/page for clarity.
- The code is intentionally simple so beginners can understand it easily.

## Suggested Next Improvements

- Add live search suggestions dropdown on the search page too
- Add real backend API integration
- Add order history page
- Add filters for cuisine, rating, and delivery time
