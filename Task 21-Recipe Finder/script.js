const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const CATEGORY_URL = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryFilter = document.getElementById("categoryFilter");
const recipesContainer = document.getElementById("recipesContainer");
const loading = document.getElementById("loading");
const message = document.getElementById("message");
const emptyState = document.getElementById("emptyState");

const favoritesBtn = document.getElementById("favoritesBtn");
const favoriteCount = document.getElementById("favoriteCount");

const recipeModal = document.getElementById("recipeModal");
const closeModal = document.getElementById("closeModal");
const modalBody = document.getElementById("modalBody");

let recipes = [];
let filteredRecipes = [];
let favorites = JSON.parse(localStorage.getItem("recipeFavorites")) || [];
let showingFavorites = false;

async function fetchRecipes(searchTerm = "") {
  loading.classList.remove("hidden");
  message.classList.add("hidden");
  emptyState.classList.add("hidden");

  try {
    const response = await fetch(`${API_URL}${encodeURIComponent(searchTerm)}`);

    if (!response.ok) {
      throw new Error("Failed to fetch recipes.");
    }

    const data = await response.json();

    recipes = data.meals || [];

    filteredRecipes = [...recipes];

    applyCategoryFilter();

    if (filteredRecipes.length === 0) {
      emptyState.classList.remove("hidden");
    }
  } catch (error) {
    recipesContainer.innerHTML = "";
    message.classList.remove("hidden");
    message.querySelector("p").textContent = error.message;
  } finally {
    loading.classList.add("hidden");
  }
}

async function fetchCategories() {
  try {
    const response = await fetch(CATEGORY_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch categories.");
    }

    const data = await response.json();

    categoryFilter.innerHTML = `
            <option value="all">
                All Categories
            </option>
        `;

    data.meals.forEach((category) => {
      const option = document.createElement("option");

      option.value = category.strCategory;
      option.textContent = category.strCategory;

      categoryFilter.appendChild(option);
    });
  } catch (error) {
    categoryFilter.innerHTML = `
            <option value="all">
                All Categories
            </option>
        `;
  }
}

function applyCategoryFilter() {
  const selectedCategory = categoryFilter.value;

  if (selectedCategory === "all") {
    filteredRecipes = [...recipes];
  } else {
    filteredRecipes = recipes.filter((recipe) => {
      return recipe.strCategory === selectedCategory;
    });
  }

  renderRecipes(filteredRecipes);
}

function renderRecipes(data) {
  recipesContainer.innerHTML = "";

  if (data.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  data.forEach((recipe) => {
    const isFavorite = favorites.includes(recipe.idMeal);

    const card = document.createElement("article");

    card.className = "recipe-card";

    card.innerHTML = `
            <div class="recipe-image">
                <img
                    src="${recipe.strMealThumb}"
                    alt="${recipe.strMeal}">

                <button
                    class="favorite-btn ${isFavorite ? "active" : ""}"
                    onclick="toggleFavorite('${recipe.idMeal}')">

                    <i class="fa-solid fa-heart"></i>

                </button>
            </div>

            <div class="recipe-content">

                <span class="recipe-category">
                    ${recipe.strCategory || "Recipe"}
                </span>

                <h3 class="recipe-title">
                    ${recipe.strMeal}
                </h3>

                <div class="recipe-info">

                    <span>
                        <i class="fa-solid fa-globe"></i>
                        ${recipe.strArea || "International"}
                    </span>

                    <span>
                        <i class="fa-solid fa-utensils"></i>
                        ${recipe.strCategory || "Food"}
                    </span>

                </div>

                <div class="recipe-actions">

                    <button
                        class="details-btn"
                        onclick="showRecipeDetails('${recipe.idMeal}')">

                        <i class="fa-solid fa-book-open"></i>
                        View Recipe

                    </button>

                    <button
                        class="card-favorite-btn"
                        onclick="toggleFavorite('${recipe.idMeal}')">

                        <i class="fa-solid fa-heart"></i>

                    </button>

                </div>

            </div>
        `;

    recipesContainer.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();

  showingFavorites = false;

  fetchRecipes(searchTerm);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const searchTerm = searchInput.value.trim();

    showingFavorites = false;

    fetchRecipes(searchTerm);
  }
});

categoryFilter.addEventListener("change", () => {
  showingFavorites = false;

  applyCategoryFilter();
});
async function showRecipeDetails(recipeId) {
  loading.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipe details.");
    }

    const data = await response.json();

    if (!data.meals || data.meals.length === 0) {
      throw new Error("Recipe details not found.");
    }

    const recipe = data.meals[0];

    displayRecipeModal(recipe);
  } catch (error) {
    alert(error.message);
  } finally {
    loading.classList.add("hidden");
  }
}

function getIngredients(recipe) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return ingredients;
}

function displayRecipeModal(recipe) {
  const ingredients = getIngredients(recipe);

  const ingredientsHTML = ingredients
    .map((item) => {
      return `
            <div class="ingredient">
                <i class="fa-solid fa-circle-check"></i>
                <span>
                    ${item.measure} ${item.ingredient}
                </span>
            </div>
        `;
    })
    .join("");

  const isFavorite = favorites.includes(recipe.idMeal);

  modalBody.innerHTML = `
        <div class="modal-top">

            <div class="modal-image">

                <img
                    src="${recipe.strMealThumb}"
                    alt="${recipe.strMeal}">

            </div>

            <div class="modal-details">

                <span class="modal-category">
                    ${recipe.strCategory || "Recipe"}
                </span>

                <h2>
                    ${recipe.strMeal}
                </h2>

                <div class="modal-meta">

                    <span>
                        <i class="fa-solid fa-globe"></i>
                        ${recipe.strArea || "International"}
                    </span>

                    <span>
                        <i class="fa-solid fa-utensils"></i>
                        ${recipe.strCategory || "Food"}
                    </span>

                    <span>
                        <i class="fa-solid fa-heart"></i>
                        ${isFavorite ? "Favorite" : "Not Favorite"}
                    </span>

                </div>

                <button
                    class="details-btn"
                    onclick="toggleFavorite('${recipe.idMeal}'); displayRecipeModalById('${recipe.idMeal}')">

                    <i class="fa-solid fa-heart"></i>
                    ${isFavorite ? "Remove Favorite" : "Add to Favorites"}

                </button>

            </div>

        </div>

        <div class="modal-section">

            <h3>
                Ingredients
            </h3>

            <div class="ingredients-list">
                ${ingredientsHTML}
            </div>

        </div>

        <div class="modal-section">

            <h3>
                Instructions
            </h3>

            <p class="instructions">
                ${recipe.strInstructions || "No instructions available."}
            </p>

        </div>
    `;

  recipeModal.classList.remove("hidden");

  document.body.style.overflow = "hidden";
}

async function displayRecipeModalById(recipeId) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
    );

    const data = await response.json();

    if (!data.meals || data.meals.length === 0) {
      return;
    }

    displayRecipeModal(data.meals[0]);
  } catch (error) {
    alert(error.message);
  }
}
closeModal.addEventListener("click", () => {
    recipeModal.classList.add("hidden");
    document.body.style.overflow = "";
});

recipeModal.addEventListener("click", event => {
    if (event.target === recipeModal) {
        recipeModal.classList.add("hidden");
        document.body.style.overflow = "";
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        recipeModal.classList.add("hidden");
        document.body.style.overflow = "";
    }
});

window.addEventListener("load", async () => {
    await fetchCategories();
    await fetchRecipes("chicken");
    updateFavoriteCount();
});