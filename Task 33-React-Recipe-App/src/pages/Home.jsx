import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeGrid from "../components/RecipeGrid";
import { searchRecipes } from "../services/recipeApi";

function Home({ favorites, onToggleFavorite }) {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(searchQuery) {
    setLoading(true);
    setError("");

    try {
      const results = await searchRecipes(searchQuery);
      setRecipes(results);
    } catch (error) {
      setRecipes([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch("chicken");
  }, []);

  return (
    <main className="home-page">
      <section className="hero">
        <h1>Recipe Finder</h1>

        <p>
          Discover delicious recipes for your next meal.
        </p>

        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
        />
      </section>

      <section className="recipes-section">
        {loading && (
          <p className="status-message">
            Loading recipes...
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {!loading && !error && (
          <RecipeGrid
            recipes={recipes}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </section>
    </main>
  );
}

export default Home;