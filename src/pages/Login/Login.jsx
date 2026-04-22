import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const from = location.state?.from || "/";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData);
    navigate(from, { replace: true });
  };

  return (
    <main className="page-container login-page">
      <section className="login-page__card panel">
        <div className="login-page__intro">
          <span className="login-page__badge">Simple mock auth</span>
          <h1>Sign in to continue ordering on Foody.</h1>
          <p>
            This demo uses localStorage-based authentication so users can log in and continue the
            cart or checkout flow.
          </p>
        </div>

        <form className="login-page__form" onSubmit={handleSubmit}>
          <label>
            <span>
              <FiUser /> Name
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>

          <label>
            <span>
              <FiMail /> Email
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            <span>
              <FiLock /> Password
            </span>
            <input
              type="password"
              defaultValue="password"
              placeholder="Any password works"
              readOnly
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
