const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const addNoteBtn = document.getElementById("addNote");
const searchInput = document.getElementById("search");
const notesContainer = document.getElementById("notesContainer");
const emptyState = document.getElementById("emptyState");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editId = null;
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function formatDate() {
  const now = new Date();
  return now.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function renderNotes(filteredNotes = notes) {
  notesContainer.innerHTML = "";
  if (filteredNotes.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  filteredNotes.forEach((note) => {
    const noteCard = document.createElement("div");
    noteCard.className = "note-card";
    if (note.pinned) {
      noteCard.style.border = "2px solid #f59e0b";
    }

    noteCard.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.description}</p>
            <div class="note-date">
                <i class="fa-solid fa-calendar"></i>
                ${note.date}
            </div>
            <div class="note-actions">
                <button
                    class="pin-btn"
                    onclick="togglePin('${note.id}')">
                    <i class="fa-solid fa-thumbtack"></i>
                </button>
                <button
                    class="edit-btn"
                    onclick="editNote('${note.id}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button
                    class="delete-btn"
                    onclick="deleteNote('${note.id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    notesContainer.appendChild(noteCard);
  });
}

addNoteBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  if (title === "" || description === "") {
    alert("Please fill in both fields.");
    return;
  }

  if (editId) {
    const note = notes.find((item) => item.id === editId);
    if (note) {
      note.title = title;
      note.description = description;
    }
    editId = null;
    addNoteBtn.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Add Note
        `;
  } else {
    const newNote = {
      id: Date.now().toString(),
      title: title,
      description: description,
      date: formatDate(),
      pinned: false,
    };
    notes.unshift(newNote);
  }
  saveNotes();
  renderNotes();
  titleInput.value = "";
  descriptionInput.value = "";
});

function deleteNote(id) {
  const confirmDelete = confirm("Are you sure you want to delete this note?");
  if (!confirmDelete) {
    return;
  }
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  renderNotes();
}

function editNote(id) {
  const note = notes.find((item) => item.id === id);
  if (!note) {
    return;
  }

  titleInput.value = note.title;
  descriptionInput.value = note.description;
  editId = id;
  addNoteBtn.innerHTML = `
        <i class="fa-solid fa-pen"></i>
        Update Note
    `;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function togglePin(id) {
  const note = notes.find((item) => item.id === id);
  if (!note) {
    return;
  }
  note.pinned = !note.pinned;
  notes.sort((a, b) => {
    return b.pinned - a.pinned;
  });
  saveNotes();
  renderNotes();
}

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.trim().toLowerCase();
  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchValue) ||
      note.description.toLowerCase().includes(searchValue)
    );
  });
  renderNotes(filteredNotes);
});
function clearForm() {
  titleInput.value = "";
  descriptionInput.value = "";
  editId = null;
  addNoteBtn.innerHTML = `
        <i class="fa-solid fa-plus"></i>
        Add Note
    `;
}

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "Enter") {
    addNoteBtn.click();
  }
});

descriptionInput.addEventListener("input", () => {
  descriptionInput.style.height = "auto";
  descriptionInput.style.height = descriptionInput.scrollHeight + "px";
});

titleInput.addEventListener("focus", () => {
  titleInput.style.borderColor = "#6366f1";
});

descriptionInput.addEventListener("focus", () => {
  descriptionInput.style.borderColor = "#6366f1";
});

titleInput.addEventListener("blur", () => {
  titleInput.style.borderColor = "transparent";
});

descriptionInput.addEventListener("blur", () => {
  descriptionInput.style.borderColor = "transparent";
});

window.addEventListener("DOMContentLoaded", () => {
  if (notes.length > 0) {
    notes.sort((a, b) => {
      return b.pinned - a.pinned;
    });
  }
  renderNotes();
});

function resetForm() {
  titleInput.value = "";
  descriptionInput.value = "";
  editId = null;
  addNoteBtn.innerHTML = `
        <i class="fa-solid fa-plus"></i>
        Add Note
    `;
}

window.addEventListener("beforeunload", () => {
  saveNotes();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    resetForm();
  }
});

window.addEventListener("load", () => {
  titleInput.focus();
});

