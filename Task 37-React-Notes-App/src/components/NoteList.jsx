import NoteCard from "./NoteCard";

function NoteList({ notes, deleteNote, startEdit }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No notes yet. Add your first note!</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          startEdit={startEdit}
        />
      ))}
    </div>
  );
}

export default NoteList;