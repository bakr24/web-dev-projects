function NoteItem({ note, onDeleteNote, onEditNote }) {
  return (
    <div className="note-item">
      <div className="note-content">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>
      <div className="note-actions">
        <button onClick={() => onEditNote(note.id)}>Edit</button>
        <button onClick={() => onDeleteNote(note.id)}>Delete</button>
      </div>
    </div>
  );
}

export default NoteItem;