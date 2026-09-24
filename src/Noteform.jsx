import React, { useState, useEffect } from "react";

function NoteForm({ onSave, editingNote, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  // changes in 'editingNote'
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
    setError(false);
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" && content.trim() === "") {
      setError(true);
      return;
    }

    onSave({ title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
    setError(false);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="note-form-title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note…"
        className="note-form-content"
        rows={4}
      />

      {error && <p className="note-form-error">A note needs a title or some content.</p>}

      <div className="note-form-actions">
        <button type="submit" className="btn btn-primary">
          {editingNote ? "Update Note" : "Add Note"}
        </button>
        {editingNote && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;