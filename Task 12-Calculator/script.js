const result = document.getElementById("result");
const history = document.getElementById("history");
const buttons = document.querySelectorAll(".buttons button");
let currentInput = "";
let previousInput = "";

function updateDisplay() {
  result.value = currentInput || "0";
}

function calculate() {
  try {
    previousInput = currentInput;
    currentInput = eval(currentInput).toString();
    history.textContent = previousInput + " =";
    updateDisplay();
  } catch {
    result.value = "Error";
    currentInput = "";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    switch (value) {
      case "AC":
        currentInput = "";
        history.textContent = "";
        updateDisplay();
        break;
      case "=":
        if (currentInput !== "") {
          calculate();
        }
        break;
      case "+/-":
        if (currentInput !== "") {
          if (currentInput.startsWith("-")) {
            currentInput = currentInput.slice(1);
          } else {
            currentInput = "-" + currentInput;
          }
          updateDisplay();
        }
        break;
      case "%":
        if (currentInput !== "") {
          currentInput = (parseFloat(currentInput) / 100).toString();
          updateDisplay();
        }
        break;
      default:
        currentInput += value;
        updateDisplay();
    }
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key) || "+-*/.".includes(key)) {
    currentInput += key;
    updateDisplay();
  } else if (key === "Enter") {
    e.preventDefault();

    calculate();
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (key === "Escape") {
    currentInput = "";
    history.textContent = "";
    updateDisplay();
  }
});
