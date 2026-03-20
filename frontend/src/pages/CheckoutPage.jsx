import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, checkout } = useCart();
  const [formData, setFormData] = useState({
    shipping_address: "",
    payment_method: "Cash on Delivery",
  });
  const [message, setMessage] = useState("");
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
    setMessage("");

    try {
      const data = await checkout(formData);
      setMessage(`${data.message}. Order ID: ${data.order.id}`);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="checkout-layout">
      <form onSubmit={handleSubmit} className="content-card checkout-form">
        <h1>Checkout</h1>
        <label>
          Shipping Address
          <textarea
            name="shipping_address"
            value={formData.shipping_address}
            onChange={handleChange}
            rows="4"
            required
          />
        </label>

        <label>
          Payment Method
          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit Card</option>
          </select>
        </label>

        {message ? <p className="message success-message">{message}</p> : null}
        {error ? <p className="message error-message">{error}</p> : null}

        <button type="submit" className="primary-button full-width">
          Place Order
        </button>
      </form>

      <aside className="content-card order-summary">
        <h2>Order Summary</h2>
        {cart.items.map((item) => (
          <div key={item.id} className="summary-row">
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <span>Rs. {(item.quantity * item.product.price).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div className="summary-row total-row">
          <strong>Total</strong>
          <strong>Rs. {cart.total_amount.toFixed(2)}</strong>
        </div>
      </aside>
    </section>
  );
}

export default CheckoutPage;
