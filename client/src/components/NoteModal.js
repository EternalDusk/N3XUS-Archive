import React from 'react';
import './NoteModal.css';

function NoteModal({ note, onClose }) {
  if (!note) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{note.sourceName}</h2>
        <p>{note.description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NoteModal;
