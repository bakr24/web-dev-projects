const textInput = document.getElementById("textInput");
const sizeInput = document.getElementById("sizeInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const qrSection = document.getElementById("qrSection");
const qrCode = document.getElementById("qrCode");
const emptyState = document.getElementById("emptyState");
const errorMessage = document.getElementById("errorMessage");

let qrInstance = null;

function showError(text) {
  errorMessage.classList.remove("hidden");
  errorMessage.querySelector("span").textContent = text;
}

function hideError() {
  errorMessage.classList.add("hidden");
}

function generateQRCode() {
  const text = textInput.value.trim();
  const size = Number(sizeInput.value);

  hideError();

  if (!text) {
    showError("Please enter some text or a URL.");
    return;
  }

  qrCode.innerHTML = "";

  qrInstance = new QRCode(qrCode, {
    text: text,
    width: size,
    height: size,
    colorDark: "#1e293b",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  qrSection.classList.remove("hidden");
  emptyState.classList.add("hidden");
}

generateBtn.addEventListener("click", () => {
  generateQRCode();
});

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateQRCode();
  }
});

textInput.addEventListener("input", () => {
  if (textInput.value.trim()) {
    hideError();
  }
});

function downloadQRCode() {
  const canvas = qrCode.querySelector("canvas");

  if (!canvas) {
    showError("Please generate a QR code first.");
    return;
  }

  const link = document.createElement("a");

  link.download = "qr-code.png";
  link.href = canvas.toDataURL("image/png");

  link.click();
}

function clearQRCode() {
  textInput.value = "";
  qrCode.innerHTML = "";
  qrSection.classList.add("hidden");
  emptyState.classList.remove("hidden");
  hideError();

  qrInstance = null;

  textInput.focus();
}

downloadBtn.addEventListener("click", () => {
  downloadQRCode();
});

clearBtn.addEventListener("click", () => {
  clearQRCode();
});

sizeInput.addEventListener("change", () => {
  if (textInput.value.trim()) {
    generateQRCode();
  }
});

window.addEventListener("load", () => {
  textInput.focus();
});
