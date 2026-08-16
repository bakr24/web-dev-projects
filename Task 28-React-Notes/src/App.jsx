import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim()
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function editNote(id) {
    const note = notes.find((note) => note.id === id);

    if (!note) {
      return;
    }

    const updatedTitle = prompt("Enter new title:", note.title);
    const updatedContent = prompt("Enter new content:", note.content);

    if (!updatedTitle || !updatedContent) {
      return;
    }

    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              title: updatedTitle.trim(),
              content: updatedContent.trim()
            }
          : note
      )
    );
  }

  return (
    <main className="app">
      <div className="container">
        <header className="header">
          <h1>My Notes</h1>
          <p>Create and manage your personal notes</p>
        </header>

        <NoteForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          onAddNote={addNote}
        />

        <NoteList
          notes={notes}
          onDeleteNote={deleteNote}
          onEditNote={editNote}
        />
      </div>
    </main>
  );
}

export default App;