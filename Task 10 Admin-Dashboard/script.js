const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const icon = themeBtn.querySelector("i");
  if (document.body.classList.contains("dark")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});

const menuItems = document.querySelectorAll(".menu li");
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((menu) => menu.classList.remove("active"));
    item.classList.add("active");
  });
});

const searchInput = document.querySelector(".search-box input");
searchInput.addEventListener("keyup", () => {
  console.log("Searching:", searchInput.value);
});

const bell = document.querySelector(".notification");
bell.addEventListener("click", () => {
  alert("🔔 You have 3 new notifications!");
});
