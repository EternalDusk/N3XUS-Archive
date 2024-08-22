const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const noteSchema = new mongoose.Schema({
    topicUID: {
        type: [String],
        required: true
    },
    sourceName: {
        type: String,
        required: true
    },
    sourceURL: {
        type: String,
        required: true
    },
    sourceType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    comments: [commentSchema]
});

module.exports = mongoose.model('Note', noteSchema);