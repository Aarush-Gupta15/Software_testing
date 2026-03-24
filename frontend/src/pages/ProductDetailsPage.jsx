import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiGet } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await apiGet(`/api/products/${productId}`);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadProduct();
  }, [productId]);

  async function handleAddToCart() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await addToCart(product.id);
      navigate("/cart");
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return <p className="message error-message">{error}</p>;
  }

  if (!product) {
    return <p className="message">Loading product...</p>;
  }

  return (
    <section className="details-layout">
      <img src={product.image_url} alt={product.name} className="details-image" />
      <div className="details-panel">
        <span className="product-category">{product.category}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price-text">Rs. {product.price.toFixed(2)}</p>
        <p>Available stock: {product.stock}</p>
        <button className="primary-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
