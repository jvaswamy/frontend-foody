import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import { registerClient, loginClient } from "../../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("initial"); // initial -> ask phone, signup -> show name/email

  const from = location.state?.from || "/";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Initial phone-only submit: try login; if 404 -> show signup form
  const handlePhoneSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { mobileNumber } = formData;
      if (!mobileNumber) {
        setError("Phone number is required");
        setLoading(false);
        return;
      }

      const res = await loginClient({ mobileNumber });
      if (res.status === 200) {
        const client = res.data.client || {};
        if (res.data.token) localStorage.setItem("foody-token", res.data.token);
        login({ name: client.name || client.email || "", email: client.email });
        navigate(from, { replace: true });
        return;
      }

      if (res.status === 404) {
        // not registered -> show signup fields
        setStep("signup");
        setLoading(false);
        return;
      }

      setError(res.data?.error || "Login failed");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Signup submit after phone was not found
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { name, email, mobileNumber } = formData;
      if (!mobileNumber) {
        setError("Phone number is required");
        setLoading(false);
        return;
      }

      const reg = await registerClient({ name, email, mobileNumber });
      if (reg.status === 201) {
        const client = reg.data.client || { name, email };
        if (reg.data.token) localStorage.setItem("foody-token", reg.data.token);
        login({ name: client.name, email: client.email });
        navigate(from, { replace: true });
        return;
      }

      setError(reg.data?.error || "Registration failed");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container login-page">
      <section className="login-page__card panel">
        <div className="login-page__intro">
          <span className="login-page__badge">Simple mock auth</span>
          <h1>Sign in to continue ordering on Foody.</h1>
          <p>
            This demo uses localStorage-based authentication so users can log in
            and continue the cart or checkout flow.
          </p>
        </div>

        {step === "initial" ? (
          <form className="login-page__form" onSubmit={handlePhoneSubmit}>
            <label>
              <span>Phone</span>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </label>

            {error && (
              <div className="panel empty-state" style={{ color: "#b91c1c" }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Continue"}
            </button>
          </form>
        ) : (
          <form className="login-page__form" onSubmit={handleSignupSubmit}>
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
              <span>Phone</span>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </label>

            {error && (
              <div className="panel empty-state" style={{ color: "#b91c1c" }}>
                {error}
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setStep("initial")}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Sign up"}
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}

export default LoginPage;
