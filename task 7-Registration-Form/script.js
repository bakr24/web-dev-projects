const form = document.getElementById("registerForm");
const message = document.getElementById("message");
const toggles = document.querySelectorAll(".toggle");

toggles.forEach((icon) => {
  icon.addEventListener("click", () => {
    const input = document.getElementById(icon.dataset.target);

    if (input.type === "password") {
      input.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const password= document.getElementById("password").value;
  const confirm= document.getElementById("confirmPassword").value;
  const terms =document.getElementById("terms").checked;

  if (password !==confirm) {
    message.textContent= "Passwords do not match.";
    message.style.color= "red";
    return;
  }
  if (!terms){
    message.textContent= "Please accept the Terms & Conditions.";
    message.style.color= "red";
    return;
  }

  message.textContent= "Account created successfully! 🎉";
  message.style.color= "green";
  form.reset();
});
