const API_KEY = "40388d59";
const BASE_URL = "https://www.omdbapi.com/";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const moviesContainer = document.getElementById("moviesContainer");
const loading = document.getElementById("loading");
const message = document.getElementById("message");
const modal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close-btn");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
async function searchMovies(movieName) {
  if (movieName.trim() === "") {
    alert("Please enter a movie name.");
    return;
  }

  loading.classList.remove("hidden");
  message.classList.add("hidden");
  moviesContainer.innerHTML = "";
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${movieName}`,
    );
    const data = await response.json();
    if (data.Response === "False") {
      throw new Error(data.Error);
    }
    displayMovies(data.Search);
  } catch (error) {
    message.classList.remove("hidden");
    message.querySelector("p").textContent = error.message;
  } finally {
    loading.classList.add("hidden");
  }
}
function displayMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const isFavorite = favorites.includes(movie.imdbID);
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}"
                     alt="${movie.Title}">
            </div>
            <div class="movie-content">
                <h2 class="movie-title">${movie.Title}</h2>
                <span class="movie-year">
                    <i class="fa-solid fa-calendar"></i>
                    ${movie.Year}
                </span>
                <div class="movie-info">
                    <span>
                        <i class="fa-solid fa-film"></i>
                        Movie
                    </span>
                    <span>
                        <i class="fa-brands fa-imdb"></i>
                        IMDb
                    </span>
                </div>
                <div class="movie-buttons">
                    <button
                        class="details-btn"
                        data-id="${movie.imdbID}">
                        <i class="fa-solid fa-circle-info"></i>
                        Details
                    </button>
                    <button
                        class="favorite-btn"
                        data-id="${movie.imdbID}">
                        <i class="fa-solid fa-heart"></i>
                        ${isFavorite ? "Saved" : "Favorite"}
                    </button>
                </div>
            </div>
        `;
    moviesContainer.appendChild(movieCard);
  });
  addCardEvents();
}

function addCardEvents() {
  const detailButtons = document.querySelectorAll(".details-btn");
  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;

      getMovieDetails(id);
    });
  });
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      toggleFavorite(id);
    });
  });
}

async function getMovieDetails(imdbID) {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`,
    );
    const movie = await response.json();
    if (movie.Response === "False") {
      throw new Error(movie.Error);
    }
    showMovieModal(movie);
  } catch (error) {
    alert(error.message);
  }
}

function showMovieModal(movie) {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";
  modalBody.innerHTML = `
    <img src="${poster}" alt="${movie.Title}">
    <div class="movie-details">
        <h2>${movie.Title}</h2>
        <p><strong>Released:</strong> ${movie.Released}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Runtime:</strong> ${movie.Runtime}</p>
        <p><strong>Language:</strong> ${movie.Language}</p>
        <p><strong>Country:</strong> ${movie.Country}</p>
        <p><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Awards:</strong> ${movie.Awards}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
    </div>
`;
  modal.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

function toggleFavorite(imdbID) {
  const index = favorites.indexOf(imdbID);

  if (index === -1) {
    favorites.push(imdbID);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  if (searchInput.value.trim() !== "") {
    searchMovies(searchInput.value);
  }
}

searchBtn.addEventListener("click", () => {
  const movieName = searchInput.value.trim();

  searchMovies(movieName);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const movieName = searchInput.value.trim();

    searchMovies(movieName);
  }
});

window.addEventListener("load", () => {
  searchMovies("Avengers");
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() !== "") {
    message.classList.add("hidden");
  }
});
