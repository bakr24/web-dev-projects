import { useEffect, useState } from "react";

function NoteForm({
  addNote,
  editingNote,
  updateNote,
  cancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    if (editingNote) {
      updateNote({
        ...editingNote,
        title,
        content,
      });
    } else {
      addNote({
        id: Date.now(),
        title,
        content,
      });
    }

    setTitle("");
    setContent("");
  }

  return (
    <form
      className="note-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(event) =>
          setContent(event.target.value)
        }
      />

      <button type="submit">
        {editingNote ? "Update Note" : "Add Note"}
      </button>

      {editingNote && (
        <button
          type="button"
          onClick={cancelEdit}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default NoteForm;