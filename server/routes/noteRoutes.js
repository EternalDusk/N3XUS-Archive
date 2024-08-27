const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Routes for notes
router.get('/', noteController.getNotes); // Lists all notes
router.get('/recent', noteController.getRecentNotes); // Lists the 10 most recent notes
router.post('/', noteController.createNote); // Creates a new note
router.get('/by-topic', noteController.getNotesByTopic); // Gets notes by their topic (using query params)
router.get('/:id', noteController.getNoteById); // Grabs a note by its ID
router.put('/:id', noteController.updateNote); // Updates a note by its ID with the data in the body
router.delete('/:id', noteController.deleteNote); // Deletes a note by its ID

// Routes for comments
router.post('/:id/comments', noteController.addComment); // Adds a comment to a note by its ID
router.delete('/:id/comments/:commentID', noteController.removeComment); // Removes a comment from a note by the note and comment IDs

module.exports = router;
