import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

function CartPage() {
  const { cart, removeFromCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <section className="empty-state">
        <h1>Your cart is empty</h1>
        <p>Add products from the home page to continue shopping.</p>
        <Link to="/" className="primary-button link-button">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="content-card">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {cart.items.map((item) => (
          <article key={item.id} className="cart-item">
            <img src={item.product.image_url} alt={item.product.name} className="cart-image" />
            <div>
              <h3>{item.product.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: Rs. {item.product.price.toFixed(2)}</p>
            </div>
            <button
              className="secondary-button"
              onClick={() => removeFromCart(item.product.id)}
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: Rs. {cart.total_amount.toFixed(2)}</h2>
        <Link to="/checkout" className="primary-button link-button">
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}

export default CartPage;
