import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";

function MovieDetails({ favorites, onToggleFavorite }) {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      setError("");

      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading movie...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!movie) {
    return <p className="error-message">Movie not found.</p>;
  }

  const isFavorite = favorites.some(
    (favorite) => favorite.imdbID === movie.imdbID
  );

  return (
    <main className="movie-details">
      <div className="details-poster">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.Title}
        />
      </div>

      <div className="details-content">
        <h1>{movie.Title}</h1>

        <p>{movie.Year} • {movie.Runtime}</p>

        <p>{movie.Genre}</p>

        <p className="plot">{movie.Plot}</p>

        <p>
          <strong>Director:</strong> {movie.Director}
        </p>

        <p>
          <strong>Actors:</strong> {movie.Actors}
        </p>

        <p>
          <strong>IMDb Rating:</strong> {movie.imdbRating}
        </p>

        <button onClick={() => onToggleFavorite(movie)}>
          {isFavorite
            ? "★ Remove from Favorites"
            : "☆ Add to Favorites"}
        </button>

        <Link to="/">← Back to Movies</Link>
      </div>
    </main>
  );
}

export default MovieDetails;