import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="site-header">
      <div className="brand-block">
        <Link to="/" className="brand-logo">
          ShopWave
        </Link>
        <span className="brand-tagline">Clean, simple shopping for modern students.</span>
      </div>

      <nav className="main-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
        {isAuthenticated ? (
          <>
            <span className="welcome-text">Hi, {user?.name}</span>
            <button className="secondary-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/auth">Login</NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
