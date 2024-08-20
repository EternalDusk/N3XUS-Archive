import React, { useEffect, useState } from 'react';
import { getNotes } from '../services/api';

import './HomePage.css';

import Note from '../components/Note';
import NoteModal from '../components/NoteModal';

const HomePage = () => {
    // For handling modal triggerings
    const [selectedNote, setSelectedNote] = useState(null);

    // Fetching Notes
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes().then(response => {
            setNotes(response.data);
        });
    }, []);

    // Displaying Webpage
    return (
        <div>
            <div className="home-container">
                <h1>Welcome to Nexus!</h1>
            </div>
            <div>
                <div className="notes-list">
                    {notes.map((note) => (
                    <Note key={note.noteUID} note={note} onClick={() => setSelectedNote(note)} />
                    ))}
                </div>
                <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
            </div>
        </div>
    );
};

export default HomePage;
