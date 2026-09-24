import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search notes…"
      className="search-input"
      aria-label="Search notes"
    />
  );
}

export default SearchBar;