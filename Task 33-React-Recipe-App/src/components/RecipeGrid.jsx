import RecipeCard from "./RecipeCard";

function RecipeGrid({
  recipes,
  favorites,
  onToggleFavorite,
}) {
  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <p>No recipes found.</p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          isFavorite={favorites.some(
            (favorite) => favorite.idMeal === recipe.idMeal
          )}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default RecipeGrid;