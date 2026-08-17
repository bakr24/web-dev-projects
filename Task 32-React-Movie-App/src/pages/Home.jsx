import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import { searchMovies } from "../services/movieApi";

function Home({ favorites, onToggleFavorite }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(searchQuery) {
    setLoading(true);
    setError("");

    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
    } catch (error) {
      setMovies([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch("Avengers");
  }, []);

  return (
    <main className="home-page">
      <section className="hero">
        <h1>Movie Finder</h1>
        <p>Search for your favorite movies.</p>

        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
        />
      </section>

      <section className="movies-section">
        {loading && (
          <p className="status-message">
            Loading movies...
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {!loading && !error && (
          <MovieGrid
            movies={movies}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </section>
    </main>
  );
}

export default Home;