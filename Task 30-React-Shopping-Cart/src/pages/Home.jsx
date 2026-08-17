import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home({ onAddToCart }) {
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Style</h1>
          <p>Discover quality products at affordable prices.</p>
        </div>
      </section>

      <section className="products-section">
        <div className="section-header">
          <h2>Our Products</h2>

          <div className="category-buttons">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;