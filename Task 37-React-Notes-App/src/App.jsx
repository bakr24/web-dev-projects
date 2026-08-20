import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes)
    );
  }, [notes]);

  function addNote(note) {
    setNotes([...notes, note]);
  }

  function deleteNote(id) {
    setNotes(
      notes.filter((note) => note.id !== id)
    );

    if (editingNote?.id === id) {
      setEditingNote(null);
    }
  }

  function startEdit(note) {
    setEditingNote(note);
  }

  function updateNote(updatedNote) {
    setNotes(
      notes.map((note) =>
        note.id === updatedNote.id
          ? updatedNote
          : note
      )
    );

    setEditingNote(null);
  }

  function cancelEdit() {
    setEditingNote(null);
  }

  const filteredNotes = notes.filter((note) =>
    note.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="app">
      <header className="header">
        <h1>My Notes 📝</h1>

        <p>
          Add, search, edit, and manage your notes.
        </p>
      </header>

      <NoteForm
        addNote={addNote}
        editingNote={editingNote}
        updateNote={updateNote}
        cancelEdit={cancelEdit}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <NoteList
        notes={filteredNotes}
        deleteNote={deleteNote}
        startEdit={startEdit}
      />
    </main>
  );
}

export default App;