import RecipeGrid from "../components/RecipeGrid";

function Favorites({
  favorites = [],
  onToggleFavorite,
}) {
  return (
    <main className="favorites-page">
      <h1>My Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>
            You haven't added any favorite recipes yet.
          </p>
        </div>
      ) : (
        <RecipeGrid
          recipes={favorites}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </main>
  );
}

export default Favorites;