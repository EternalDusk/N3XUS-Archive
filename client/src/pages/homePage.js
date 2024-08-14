import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note._id}>{note.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
