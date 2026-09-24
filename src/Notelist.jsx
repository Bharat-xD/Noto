import React from "react";
import NoteCard from "./NoteCard";

function NoteList({ notes, onEdit, onDelete, hasSearchTerm }) {
  if (notes.length === 0) {
    return (
      <p className="empty-message">
        {hasSearchTerm ? "No notes match your search." : "No notes yet — add one above."}
      </p>
    );
  }

  return (
    <div className="note-grid">
      {/* map() turns each note object then into a rendered NoteCard */}
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default NoteList;