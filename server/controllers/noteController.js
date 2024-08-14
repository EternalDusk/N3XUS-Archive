const Note = require('../models/note');

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createNote = async (req, res) => {
    try {
        const { noteUID, topicUID, sourceName, sourceURL, sourceType, description, postedBy } = req.body;
        const newNote = new Note({
            noteUID,
            topicUID,
            sourceName,
            sourceURL,
            sourceType,
            description,
            postedBy
        });
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { noteUID, topicUID, sourceName, sourceURL, sourceType, description, postedBy, upvotes, downvotes, comments } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {
                noteUID,
                topicUID,
                sourceName,
                sourceURL,
                sourceType,
                description,
                postedBy,
                upvotes,
                downvotes,
                comments
            },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { commentID, userID, commentText } = req.body;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        note.comments.push({
            commentID,
            userID,
            commentText,
            timestamp: new Date()
        });
        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeComment = async (req, res) => {
    try {
        const { id, commentID } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        note.comments = note.comments.filter(comment => comment.commentID !== commentID);
        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
