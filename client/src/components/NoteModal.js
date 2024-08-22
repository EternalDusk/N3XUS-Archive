import React from 'react';
import './NoteModal.css';

function NoteModal({ note, onClose }) {
  if (!note) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{note.sourceName} - <a href={note.sourceURL} target='_blank' rel="noreferrer">{note.sourceURL}</a></h2>
        <h4>Topic: {note.topicUID.join(', ')} - Type: {note.sourceType}</h4>
        <p>{note.description}</p>
        <h4>Uploaded by: {note.postedBy}</h4>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NoteModal;
