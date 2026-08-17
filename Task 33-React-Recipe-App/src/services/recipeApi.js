const BASE_URL =
  "https://www.themealdb.com/api/json/v1/1";

export async function searchRecipes(query) {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipes.");
  }

  const data = await response.json();

  return data.meals || [];
}

export async function getRecipeDetails(id) {
  const response = await fetch(
    `${BASE_URL}/lookup.php?i=${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipe details.");
  }

  const data = await response.json();

  if (!data.meals) {
    throw new Error("Recipe not found.");
  }

  return data.meals[0];
}