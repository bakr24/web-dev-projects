const button = document.getElementById("likeBtn");

button.addEventListener("click", () => {
  button.textContent = "❤️ Liked";

  button.style.background = "#28a745";

  button.disabled = true;
});
