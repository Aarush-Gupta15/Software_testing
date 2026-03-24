import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiGet } from "../api/client";
import { useAuth } from "../context/AuthContext";

function MyOrdersPage() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const data = await apiGet("/api/orders", token);
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [token]);

  if (loading) {
    return <section className="content-card"><p>Loading your orders...</p></section>;
  }

  if (error) {
    return (
      <section className="content-card">
        <p className="message error-message">{error}</p>
      </section>
    );
  }

  return (
    <section className="orders-layout">
      <div className="hero-panel compact-hero">
        <span className="eyebrow">Order History</span>
        <h1>{user?.name ? `${user.name}'s Orders` : "My Orders"}</h1>
        <p>Each order below belongs only to the logged-in user and appears once with its own items.</p>
      </div>

      {orders.length === 0 ? (
        <div className="content-card empty-state">
          <h2>No orders placed yet</h2>
          <p>Place your first order and it will appear here.</p>
          <Link to="/" className="primary-button">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article key={order.id} className="content-card order-card">
              <div className="order-card-header">
                <div>
                  <span className="eyebrow">Order #{order.id}</span>
                  <h2>Placed Order</h2>
                </div>
                <span className="order-status">{order.status}</span>
              </div>

              <div className="order-meta-grid">
                <div>
                  <strong>Payment</strong>
                  <p>{order.payment_method}</p>
                </div>
                <div>
                  <strong>Total</strong>
                  <p>Rs. {Number(order.total_amount).toFixed(2)}</p>
                </div>
                <div className="order-address-block">
                  <strong>Shipping Address</strong>
                  <p>{order.shipping_address}</p>
                </div>
              </div>

              <div className="order-items-list">
                {order.items.map((item, index) => (
                  <div
                    key={`${order.id}-${item.product_id ?? item.product_name}-${index}`}
                    className="order-item-row"
                  >
                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      className="order-item-image"
                    />
                    <div className="order-item-content">
                      <h3>{item.product_name}</h3>
                      <p>
                        Quantity: {item.quantity} | Price: Rs. {Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    <strong>Rs. {Number(item.subtotal).toFixed(2)}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyOrdersPage;
