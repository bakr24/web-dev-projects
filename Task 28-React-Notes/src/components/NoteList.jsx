import NoteItem from "./NoteItem";

function NoteList({ notes, onDeleteNote, onEditNote }) {
  if (notes.length === 0) {
    return (
      <div className="empty-notes">
        <p>No notes yet.</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDeleteNote={onDeleteNote}
          onEditNote={onEditNote}
        />
      ))}
    </div>
  );
}

export default NoteList;