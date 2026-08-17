import { Link } from "react-router-dom";

function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  return (
    <article className="recipe-card">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-image"
      />

      <div className="recipe-content">
        <h3>{recipe.strMeal}</h3>

        <p>{recipe.strCategory || "Recipe"}</p>

        <div className="recipe-actions">
          <Link to={`/recipe/${recipe.idMeal}`}>
            View Recipe
          </Link>

          <button
            onClick={() => onToggleFavorite(recipe)}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;