import React from "react";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-card-title">{note.title || "Untitled"}</h3>
        <div className="note-card-actions">
          <button
            className="icon-btn"
            onClick={() => onEdit(note.id)}
            aria-label="Edit note"
          >
            ✎
          </button>
          <button
            className="icon-btn icon-btn-danger"
            onClick={() => onDelete(note.id)}
            aria-label="Delete note"
          >
            ✕
          </button>
        </div>
      </div>

      <p className="note-card-content">{note.content}</p>

      <p className="note-card-date">{formatDate(note.createdAt)}</p>
    </div>
  );
}

export default NoteCard;