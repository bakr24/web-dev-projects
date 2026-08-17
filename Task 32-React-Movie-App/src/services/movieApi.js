const API_KEY = "40388d59";

const BASE_URL = "http://www.omdbapi.com";

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No movies found.");
  }

  return data.Search || [];
}

export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found.");
  }

  return data;
}