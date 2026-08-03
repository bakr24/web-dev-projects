const buttons = document.querySelectorAll(".card button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "Added ✓";

    button.style.background = "#28a745";
    button.disabled = true;
  });
});

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,.15)";
  } else {
    navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";
  }
});
