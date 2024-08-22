// React
import React, { useEffect, useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// API
import { getRecentNotes } from '../services/api';

// Styling
import './HomePage.css';

// Components
import Note from '../components/Note';
import NoteModal from '../components/NoteModal';

const HomePage = () => {
    // For handling modal triggerings
    const [selectedNote, setSelectedNote] = useState(null);

    // Fetching Notes
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getRecentNotes(10).then(response => {
            setNotes(response.data);
        });
    }, []);

    // Displaying Webpage
    return (
        <div>
            <div className="home-container">
                <h1>Welcome to The Library!</h1>
                
                <div className='search-bar'>
                    <input type="text" placeholder="Search Not Yet Implemented"/>
                    <button className='search-container-button'><FontAwesomeIcon icon={faSearch} className='faIcon' /></button>
                </div>

                <h4>The Library is a community-curated database of resources and websites on many different topics.</h4>
                <h4>Follow your inner polymath!</h4>
            </div>
            <div>
                <h2>Latest Notes</h2>
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
