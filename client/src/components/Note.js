import React from 'react';
import './Note.css';

function Note({ note, onClick}){
    return (
        <div className='note-card' onClick={onClick}>
            <h2>{note.sourceName}</h2>
            <p>{note.description}</p>
        </div>
    );
}

export default Note;