import { Link, useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return (
      <main className="not-found">
        <h1>Product Not Found</h1>

        <Link to="/">
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="product-details">
      <div className="details-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="details-content">
        <p className="product-category">
          {product.category}
        </p>

        <h1>{product.name}</h1>

        <p className="details-description">
          {product.description}
        </p>

        <h2>
          PKR {product.price.toLocaleString()}
        </h2>

        <button
          className="add-details-button"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>

        <Link
          to="/"
          className="back-link"
        >
          ← Back to Products
        </Link>
      </div>
    </main>
  );
}

export default ProductDetails;