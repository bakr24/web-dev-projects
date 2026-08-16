function NoteForm({ title, setTitle, content, setContent, onAddNote }) {
  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    onAddNote();
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Note title"
      />
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your note..."
        rows="5"
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;