const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Routes for notes
router.get('/', noteController.getNotes); //Lists all notes
router.post('/', noteController.createNote); //Creates a new note
router.get('/:id', noteController.getNoteById); //Grabs a note by it's ID
router.put('/:id', noteController.updateNote); //Updates a note by it's ID with the data in body
router.delete('/:id', noteController.deleteNote); //Deletes a note by it's ID

// Routes for comments
router.post('/:id/comments', noteController.addComment); //Adds a comment to a note by it's ID
router.delete('/:id/comments/:commentID', noteController.removeComment); //Removes a comment from a note by the note and comment IDs

module.exports = router;
