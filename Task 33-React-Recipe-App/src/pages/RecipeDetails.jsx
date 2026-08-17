import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeDetails } from "../services/recipeApi";

function RecipeDetails({ favorites, onToggleFavorite }) {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      setLoading(true);
      setError("");

      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading recipe...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!recipe) {
    return <p className="error-message">Recipe not found.</p>;
  }

  const isFavorite = favorites.some(
    (favorite) => favorite.idMeal === recipe.idMeal
  );

  return (
    <main className="recipe-details">
      <div className="details-image">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />
      </div>

      <div className="details-content">
        <h1>{recipe.strMeal}</h1>

        <p>
          {recipe.strCategory} • {recipe.strArea}
        </p>

        <button
          onClick={() => onToggleFavorite(recipe)}
        >
          {isFavorite
            ? "★ Remove from Favorites"
            : "☆ Add to Favorites"}
        </button>

        <h2>Instructions</h2>

        <p className="instructions">
          {recipe.strInstructions}
        </p>

        <Link to="/">← Back to Recipes</Link>
      </div>
    </main>
  );
}

export default RecipeDetails;