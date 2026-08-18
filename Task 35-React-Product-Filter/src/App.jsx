import { useState } from "react";
import products from "./data/products";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sortBy === "low-high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "high-low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }

  return (
    <main className="app">
      <header className="header">
        <h1>Product Explorer 🛍️</h1>

        <p>
          Search, filter, and sort products.
        </p>
      </header>

      <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <ProductGrid
        products={filteredProducts}
      />
    </main>
  );
}

export default App;