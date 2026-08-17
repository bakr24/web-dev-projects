import { Link } from "react-router-dom";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  return (
    <article className="movie-card">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Poster"
        }
        alt={movie.Title}
        className="movie-poster"
      />

      <div className="movie-content">
        <h3>{movie.Title}</h3>

        <p>{movie.Year}</p>

        <div className="movie-actions">
          <Link to={`/movie/${movie.imdbID}`}>
            View Details
          </Link>

          <button
            onClick={() => onToggleFavorite(movie)}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;