import MovieGrid from "../components/MovieGrid";

function Favorites({ favorites = [], onToggleFavorite }) {
  return (
    <main className="favorites-page">
      <h1>My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>You haven't added any movies to favorites yet.</p>
        </div>
      ) : (
        <MovieGrid
          movies={favorites}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </main>
  );
}

export default Favorites;