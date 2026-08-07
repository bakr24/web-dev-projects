const websiteInput = document.getElementById("website");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const generatePasswordBtn = document.getElementById("generatePassword");
const savePasswordBtn = document.getElementById("savePassword");
const searchInput = document.getElementById("search");
const passwordTable = document.getElementById("passwordTable");
const emptyState = document.getElementById("emptyState");

let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
let editId = null;

function saveToLocalStorage() {
  localStorage.setItem(
    "passwords",
    JSON.stringify(passwords),
  );
}

function renderPasswords(data = passwords) {
  passwordTable.innerHTML = "";

  if (data.length === 0) {
    emptyState.style.display = "block";

    return;
  }

  emptyState.style.display = "none";

  data.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>
                ${item.website}
            </td>
            <td>
                ${item.username}
            </td>
            <td>
                <span class="password-text">
                    ********
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button
                        class="copy-btn"
                        onclick="copyPassword('${item.id}')">
                        <i class="fa-solid fa-copy"></i>
                    </button>
                    <button
                        class="edit-btn"
                        onclick="editPassword('${item.id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button
                        class="delete-btn"
                        onclick="deletePassword('${item.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
    passwordTable.appendChild(row);
  });
}

savePasswordBtn.addEventListener("click", () => {
  const website = websiteInput.value.trim();
  const username= usernameInput.value.trim();
  const password = passwordInput.value.trim();
  if (website === "" || username === "" || password === "") {
    alert("Please fill all fields.");
    return;
  }
  if (editId) {
    const item = passwords.find((password) => password.id === editId);
    if (item) {
      item.website = website;
      item.username = username;
      item.password = password;
    }

    editId = null;
    savePasswordBtn.innerHTML = `
            <i class="fa-solid fa-floppy-disk"></i>
            Save Password
        `;
  } else {
    passwords.unshift({
      id: Date.now().toString(),
      website: website,
      username: username,
      password: password,
    });
  }

  saveToLocalStorage();
  renderPasswords();
  clearForm();
});

togglePasswordBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordBtn.innerHTML = `
            <i class="fa-solid fa-eye-slash"></i>
        `;
  } else {
    passwordInput.type = "password";
    togglePasswordBtn.innerHTML = `
            <i class="fa-solid fa-eye"></i>
        `;
  }
});

// ==========================================
// GENERATE STRONG PASSWORD
// ==========================================

generatePasswordBtn.addEventListener("click", () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";

  let generatedPassword = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    generatedPassword += characters[randomIndex];
  }

  passwordInput.value = generatedPassword;
});

// ==========================================
// COPY PASSWORD
// ==========================================

function copyPassword(id) {
  const item = passwords.find((password) => password.id === id);

  if (!item) {
    return;
  }

  navigator.clipboard.writeText(item.password);

  alert("Password copied to clipboard.");
}

// ==========================================
// EDIT PASSWORD
// ==========================================

function editPassword(id) {
  const item = passwords.find((password) => password.id === id);

  if (!item) {
    return;
  }

  websiteInput.value = item.website;

  usernameInput.value = item.username;

  passwordInput.value = item.password;

  editId = id;

  savePasswordBtn.innerHTML = `

        <i class="fa-solid fa-pen"></i>

        Update Password

    `;

  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
}

// ==========================================
// DELETE PASSWORD
// ==========================================

function deletePassword(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this password?",
  );

  if (!confirmDelete) {
    return;
  }

  passwords = passwords.filter((password) => password.id !== id);

  saveToLocalStorage();

  renderPasswords();
}

// ==========================================
// CLEAR FORM
// ==========================================

function clearForm() {
  websiteInput.value = "";

  usernameInput.value = "";

  passwordInput.value = "";

  passwordInput.type = "password";

  togglePasswordBtn.innerHTML = `

        <i class="fa-solid fa-eye"></i>

    `;

  editId = null;

  savePasswordBtn.innerHTML = `

        <i class="fa-solid fa-floppy-disk"></i>

        Save Password

    `;
}

// ==========================================
// SEARCH PASSWORDS
// ==========================================

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.trim().toLowerCase();

  const filteredPasswords = passwords.filter((item) => {
    return (
      item.website.toLowerCase().includes(searchValue) ||
      item.username.toLowerCase().includes(searchValue)
    );
  });

  renderPasswords(filteredPasswords);
});

// ==========================================
// ENTER KEY SUPPORT
// ==========================================

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (
      document.activeElement === websiteInput ||
      document.activeElement === usernameInput ||
      document.activeElement === passwordInput
    ) {
      savePasswordBtn.click();
    }
  }
});

// ==========================================
// AUTO FOCUS FIRST INPUT
// ==========================================

window.addEventListener("load", () => {
  websiteInput.focus();
});

// ==========================================
// CHECK EMPTY STATE
// ==========================================

function checkEmptyState() {
  if (passwords.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

// ==========================================
// SORT PASSWORDS
// NEWEST FIRST
// ==========================================

function sortPasswords() {
  passwords.sort((a, b) => {
    return Number(b.id) - Number(a.id);
  });
}

// ==========================================
// SAVE WITH SORTING
// ==========================================

const originalSave = saveToLocalStorage;

saveToLocalStorage = function () {
  sortPasswords();

  originalSave();
};

// ==========================================
// INPUT FOCUS EFFECT
// ==========================================

const formInputs = document.querySelectorAll(".password-form input");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.boxShadow = "0 0 0 3px rgba(99,102,241,.45)";
  });

  input.addEventListener("blur", () => {
    input.style.boxShadow = "none";
  });
});

// ==========================================
// LOAD PASSWORDS ON PAGE LOAD
// ==========================================

window.addEventListener("DOMContentLoaded", () => {
  renderPasswords();

  checkEmptyState();
});

// ==========================================
// RESET FORM USING ESC KEY
// ==========================================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearForm();
  }
});

// ==========================================
// AUTO SAVE BEFORE LEAVING PAGE
// ==========================================

window.addEventListener("beforeunload", () => {
  saveToLocalStorage();
});

// ==========================================
// INITIALIZE APPLICATION
// ==========================================

function initializeApp() {
  sortPasswords();

  renderPasswords();

  checkEmptyState();
}

initializeApp();

// ==========================================
// OPTIONAL: COPY SUCCESS EFFECT
// ==========================================

function showCopyMessage(button) {
  const originalHTML = button.innerHTML;

  button.innerHTML = `

        <i class="fa-solid fa-check"></i>

    `;

  button.style.background = "#22c55e";

  setTimeout(() => {
    button.innerHTML = originalHTML;

    button.style.background = "";
  }, 1000);
}

// ==========================================
// OPTIONAL: IMPROVED COPY FUNCTION
// ==========================================

function copyPassword(id) {
  const item = passwords.find((password) => password.id === id);

  if (!item) {
    return;
  }

  navigator.clipboard.writeText(item.password);

  const button = event.currentTarget;

  if (button) {
    showCopyMessage(button);
  }
}

// ==========================================
// PREVENT DUPLICATE ENTRIES
// ==========================================

function passwordExists(website, username) {
  return passwords.some((password) => {
    return (
      password.website.toLowerCase() === website.toLowerCase() &&
      password.username.toLowerCase() === username.toLowerCase()
    );
  });
}

// ==========================================
// END
// ==========================================
