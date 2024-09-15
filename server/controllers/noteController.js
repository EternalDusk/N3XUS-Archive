const Note = require('../models/note');

let recentNotesCache = [];

// Get recent notes with caching
exports.getRecentNotes = async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        if (!limit || limit <= 0) {
            limit = null; // No limit if limit is 0, null, or undefined
        }

        // If cache has enough notes, return from cache
        if (recentNotesCache.length >= 10) {
            const notesToReturn = limit ? recentNotesCache.slice(0, limit) : recentNotesCache;
            return res.status(200).json(notesToReturn);
        }

        // If cache has fewer than 10 items, fetch from the database
        const notes = await Note.find().sort({ createdAt: -1 }).limit(limit || 10);

        // Update the cache if fetching the most recent notes
        if (notes.length > 0) {
            recentNotesCache = notes.slice(0, 10); // Cache only the 10 most recent notes
        }

        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Function to update the recentNotesCache manually when a new note is created
exports.updateRecentNotesCache = async () => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }).limit(10);
        recentNotesCache = notes;
    } catch (err) {
        console.error('Failed to update recentNotesCache:', err.message);
    }
};

// Create a new note and update cache
exports.createNote = async (req, res) => {
    try {
        const { topicUID, sourceName, sourceURL, sourceType, description, postedBy } = req.body;

        const newNote = new Note({
            topicUID,
            sourceName,
            sourceURL,
            sourceType,
            description,
            postedBy
        });

        const savedNote = await newNote.save();

        // Update the recentNotesCache
        recentNotesCache.unshift(savedNote); // Add the new note to the start of the cache
        if (recentNotesCache.length > 10) {
            recentNotesCache.pop(); // Remove the oldest note if the cache exceeds 10 items
        }

        res.status(201).json(savedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Other CRUD operations remain the same

exports.getNotesByTopic = async (req, res) => {
    try {
        const { topicUID } = req.query;

        if (!topicUID) {
            return res.status(400).json({ error: 'Topic UID is required' });
        }

        const notes = await Note.find({ topicUID: { $in: topicUID } });

        if (notes.length === 0) {
            return res.status(404).json({ message: 'No notes found for this topic' });
        }

        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
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
