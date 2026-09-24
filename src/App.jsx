import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import "./App.css";

const STORAGE_KEY = "notes-app.notes";

// unique id without any extra dependency.
function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  // initial load
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setNotes(JSON.parse(stored));
      }
    } catch {
      setNotes([]);      // Corrupted or blocked localStorage (start with an empty list).
    }
  }, []);

  // Save automatically, any time`notes`changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // create or Update, depending on whether editingg
  const handleSave = ({ title, content }) => {
    if (editingId) {
      // Update: map() rebuilds the array replacing only the edited note
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId ? { ...note, title, content } : note
        )
      );
      setEditingId(null);
    } else {
      // Create: spread the existing notes add a new one at the front
      const newNote = {
        id: generateId(),
        title,
        content,
        createdAt: new Date().toISOString(),
      };
      setNotes((prev) => [newNote, ...prev]);
    }
  };

  // deletoin
  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (editingId === id) setEditingId(null); 
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const editingNote = notes.find((note) => note.id === editingId) || null;

  // filter() by title or content, case insensitive
  const filteredNotes = notes.filter((note) => {
    const term = searchTerm.trim().toLowerCase();
    if (term === "") return true;
    return (
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term)
    );
  });

  return (
    <div className="page">
      <div className="app-wrap">
        <h1 className="app-title">My Notes</h1>

        <NoteForm
          onSave={handleSave}
          editingNote={editingNote}
          onCancelEdit={handleCancelEdit}
        />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <NoteList
          notes={filteredNotes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          hasSearchTerm={searchTerm.trim() !== ""}
        />
      </div>
    </div>
  );
}

export default App;