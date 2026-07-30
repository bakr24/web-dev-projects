const form = document.getElementById("newsletterForm");
const email = document.getElementById("email");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (email.value.trim() === "") {
    message.textContent = "Please enter your email.";
    message.style.color = "red";
    return;
  }

  message.textContent = "🎉 Thanks for subscribing!";
  message.style.color = "green";
  form.reset();
});
