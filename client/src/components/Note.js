import React from 'react';
import './Note.css';

function Note({ note, onClick}){
    return (
        <div className='note-card' onClick={onClick}>
            <p>
                <span className='note-title'>{note.sourceName}</span>
                <span className='note-topic'>
                    {note.topicUID
                        .map(topic => 
                            topic.replace(/-/g, ' ') // Replace '-' with ' '
                            .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize each word
                        )
                        .join(', ')
                    }
                </span>
            </p>
            <br/>
            <p className='note-description'>{note.description}</p>
        </div>
    );
}

export default Note;