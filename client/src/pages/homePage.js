// React
import React, { useEffect, useState } from 'react';

// API
import { getRecentNotes, getRecentTopics } from '../services/api';

// Styling
import './HomePage.css';

// Components
import Note from '../components/Note';
import NoteModal from '../components/NoteModal';
import Header from '../components/PageHeader';

const HomePage = () => {
    // For handling modal triggerings
    const [selectedNote, setSelectedNote] = useState(null);

    // Fetching Notes
    const [notes, setNotes] = useState([]);

    // Fetching topics
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getRecentTopics(10).then(response => {
            setTopics(response.data);
        });
    }, []);

    useEffect(() => {
        getRecentNotes(10).then(response => {
            setNotes(response.data);
        });
    }, []);

    // Displaying Webpage
    return (
        <div>
            <Header/>
            <div className='container'>
                <div className='main-column'>
                    <h2>Latest Notes</h2>
                    <div className="notes-list">
                        {notes.map((note) => (
                        <Note key={note.noteUID} note={note} onClick={() => setSelectedNote(note)} />
                        ))}
                    </div>
                    <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
                </div>
                <div className='side-column'>
                    <h2>Recent Topics</h2>
                    <ul>
                        {topics.map((topic) => (
                            <li><a href={'/topic/' + topic.TopicUID}> {topic.TopicName} </a></li>
                        ))}
                    </ul>
                </div>
                
            </div>
        </div>
    );
};

export default HomePage;
