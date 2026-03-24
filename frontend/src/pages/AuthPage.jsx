import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function AuthPage({ mode = "login" }) {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(event) {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </span>
          <h1>{mode === "login" ? "Login" : "Register"}</h1>
          <p className="auth-helper-text">
            {mode === "login"
              ? "Sign in to manage your cart, checkout, and view your orders."
              : "Register once and you can place orders and track them from My Orders."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "register" ? (
            <label>
              Full Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          ) : null}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          {error ? <p className="message error-message">{error}</p> : null}

          <button type="submit" className="primary-button full-width">
            {mode === "login" ? "Login" : "Create Account"}
          </button>

          <p className="auth-switch-text">
            {mode === "login" ? "New here?" : "Already have an account?"}{" "}
            <Link to={mode === "login" ? "/register" : "/login"}>
              {mode === "login" ? "Register" : "Login"}
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
