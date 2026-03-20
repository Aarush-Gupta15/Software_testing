import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiGet } from "../api/client";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await apiGet("/api/products");
        if (!Array.isArray(data)) {
          throw new Error("Could not load products right now");
        }
        setProducts(data);
      } catch (err) {
        setProducts([]);
        setError(err.message || "Could not load products right now");
      }
    }

    loadProducts();
  }, []);

  async function handleAddToCart(productId) {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    try {
      await addToCart(productId);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <div className="hero-panel">
        <div>
          <span className="eyebrow">Academic-ready full-stack store</span>
          <h1>Browse products, manage your cart, and place orders with a clean workflow.</h1>
          <p>
            This demo store is built to show a complete React, FastAPI, and MySQL
            integration using simple and readable code.
          </p>
        </div>
      </div>

      {error ? <p className="message error-message">{error}</p> : null}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>

      {!error && products.length === 0 ? (
        <p className="message">No products are available right now.</p>
      ) : null}
    </section>
  );
}

export default HomePage;
