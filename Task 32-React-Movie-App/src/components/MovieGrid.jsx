import MovieCard from "./MovieCard";

function MovieGrid({
  movies,
  favorites,
  onToggleFavorite,
}) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <p>No movies found.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={favorites.some(
            (favorite) => favorite.imdbID === movie.imdbID
          )}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default MovieGrid;