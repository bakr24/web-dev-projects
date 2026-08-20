function NoteCard({ note, deleteNote, startEdit }) {
  return (
    <article className="note-card">
      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <div className="note-actions">
        <button
          className="edit-btn"
          onClick={() => startEdit(note)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteNote(note.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default NoteCard;