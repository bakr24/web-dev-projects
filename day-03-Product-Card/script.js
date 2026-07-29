const button = document.getElementById("cartBtn");

button.addEventListener("click", () => {
  button.textContent = "Added ✓";

  button.style.background = "green";

  button.disabled = true;
});
