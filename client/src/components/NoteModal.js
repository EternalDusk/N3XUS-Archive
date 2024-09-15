import React from 'react';
import './NoteModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareRss, faBook, faGlobe, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function NoteModal({ note, onClose }) {
  if (!note) return null;

  // Create a mapping of sourceType to icons
  const iconMap = {
    "Blog": faSquareRss,
    "Book": faBook,
    "News": faGlobe,
  };

  // Component to display the icon based on note.sourceType
  const NoteIcon = ({ sourceType }) => {
    // Get the icon for the given sourceType, default to some icon if not found
    const icon = iconMap[sourceType] || faGlobe; // Default icon can be changed

    return <FontAwesomeIcon icon={icon} className='faIcon' title={sourceType} />;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="note-header">
          <h2>{note.sourceName} <NoteIcon sourceType={note.sourceType} /></h2>
          
        </div>
        <h3><a href={note.sourceURL} target='_blank' rel="noreferrer">{note.sourceURL}</a></h3>
        <h4>
            Tags: {note.topicUID
                .map(topic => 
                    topic.replace(/-/g, ' ') // Replace '-' with ' '
                    .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize each word
                )
                .join(', ')}
        </h4>
        <p>{note.description}</p>
        <p className='upload-text'>Uploaded by: {note.postedBy}</p>
        <button onClick={onClose} className='close-button'><FontAwesomeIcon icon={faCircleXmark} /></button>
      </div>
    </div>
  );
}

export default NoteModal;
