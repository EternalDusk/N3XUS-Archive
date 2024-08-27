const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    TopicUID: {
        type: String,
        required: true,
        unique: true
    },
    TopicName: {
        type: String,
        required: true,
        unique: true
    },
    Description: {
        type: String,
        required: true
    },
    RelatedTopics: {
        type: [String], // Array of TopicUIDs
        default: []
    }
}, { timestamps: true }); // adds createdAt and updatedAt fields

// Creates index on createdAt field
topicSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Topic', topicSchema);