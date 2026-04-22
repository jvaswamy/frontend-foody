import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="page-container">
      <section className="panel empty-state">
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
