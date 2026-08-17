import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-content">
        <p className="product-category">{product.category}</p>

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">
          <strong>PKR {product.price.toLocaleString()}</strong>

          <button onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="product-details-link"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;