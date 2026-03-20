import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart, isAuthenticated }) {
  return (
    <article className="product-card">
      <img src={product.image_url} alt={product.name} className="product-image" />
      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card-footer">
          <strong>Rs. {product.price.toFixed(2)}</strong>
          <div className="product-actions">
            <Link to={`/products/${product.id}`} className="secondary-button link-button">
              View
            </Link>
            <button
              className="primary-button"
              onClick={() => onAddToCart(product.id)}
            >
              {isAuthenticated ? "Add to Cart" : "Login to Buy"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
