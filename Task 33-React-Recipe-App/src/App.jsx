import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("recipeFavorites");

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "recipeFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function toggleFavorite(recipe) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.idMeal === recipe.idMeal
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (favorite) => favorite.idMeal !== recipe.idMeal
        );
      }

      return [...currentFavorites, recipe];
    });
  }

  return (
    <BrowserRouter>
      <Navbar favoriteCount={favorites.length} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/recipe/:id"
          element={
            <RecipeDetails
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;