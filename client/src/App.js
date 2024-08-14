import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import all pages
import HomePage from './pages/homePage';
import NotePage from './pages/notePage'; // Example for another page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/:id" element={<NotePage />} /> {/* Example route */}
      </Routes>
    </Router>
  );
}

export default App;
