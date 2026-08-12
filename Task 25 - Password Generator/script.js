const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const uppercaseInput = document.getElementById("uppercase");
const lowercaseInput = document.getElementById("lowercase");
const numbersInput = document.getElementById("numbers");
const symbolsInput = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const strengthText = document.getElementById("strengthText");
const strengthIndicator = document.getElementById("strengthIndicator");

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function getRandomCharacter(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

function shufflePassword(password) {
    const characters = password.split("");

    for (let i = characters.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[randomIndex]] = [
            characters[randomIndex],
            characters[i]
        ];
    }

    return characters.join("");
}

function generatePassword() {
    const length = Number(lengthInput.value);
    const useUppercase = uppercaseInput.checked;
    const useLowercase = lowercaseInput.checked;
    const useNumbers = numbersInput.checked;
    const useSymbols = symbolsInput.checked;

    let characterPool = "";
    let password = "";

    if (useUppercase) {
        characterPool += uppercaseChars;
        password += getRandomCharacter(uppercaseChars);
    }

    if (useLowercase) {
        characterPool += lowercaseChars;
        password += getRandomCharacter(lowercaseChars);
    }

    if (useNumbers) {
        characterPool += numberChars;
        password += getRandomCharacter(numberChars);
    }

    if (useSymbols) {
        characterPool += symbolChars;
        password += getRandomCharacter(symbolChars);
    }

    if (!characterPool) {
        passwordOutput.value = "";
        strengthText.textContent = "None";
        strengthIndicator.style.width = "0";
        return;
    }

    while (password.length < length) {
        password += getRandomCharacter(characterPool);
    }

    passwordOutput.value = shufflePassword(password);

    updateStrength();
}


function updateStrength() {
    const password = passwordOutput.value;

    if (!password) {
        strengthText.textContent = "None";
        strengthIndicator.style.width = "0";
        return;
    }

    let score = 0;

    if (password.length >= 8) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }

    if (score <= 2) {
        strengthText.textContent = "Weak";
        strengthText.style.color = "var(--weak)";
        strengthIndicator.style.width = "30%";
        strengthIndicator.style.background = "var(--weak)";
    } else if (score <= 4) {
        strengthText.textContent = "Medium";
        strengthText.style.color = "var(--medium)";
        strengthIndicator.style.width = "65%";
        strengthIndicator.style.background = "var(--medium)";
    } else {
        strengthText.textContent = "Strong";
        strengthText.style.color = "var(--strong)";
        strengthIndicator.style.width = "100%";
        strengthIndicator.style.background = "var(--strong)";
    }
}

async function copyPassword() {
    const password = passwordOutput.value;

    if (!password) {
        return;
    }

    try {
        await navigator.clipboard.writeText(password);

        copyMessage.classList.remove("hidden");

        setTimeout(() => {
            copyMessage.classList.add("hidden");
        }, 1500);
    } catch {
        passwordOutput.select();
        document.execCommand("copy");

        copyMessage.classList.remove("hidden");

        setTimeout(() => {
            copyMessage.classList.add("hidden");
        }, 1500);
    }
}

copyBtn.addEventListener("click", () => {
    copyPassword();
});

lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
    generatePassword();
});

uppercaseInput.addEventListener("change", () => {
    generatePassword();
});

lowercaseInput.addEventListener("change", () => {
    generatePassword();
});

numbersInput.addEventListener("change", () => {
    generatePassword();
});

symbolsInput.addEventListener("change", () => {
    generatePassword();
});

generateBtn.addEventListener("click", () => {
    generatePassword();
});

window.addEventListener("load", () => {
    lengthValue.textContent = lengthInput.value;
    generatePassword();
});