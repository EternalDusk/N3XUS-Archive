// controllers/topicController.js
const Topic = require('../models/topic');

// Get all topics or search topics by name or UID
exports.getRecentTopics = async (req, res) => {
    try {
        const query = {};
        if (req.query.name) {
            query.TopicName = new RegExp(req.query.name, 'i'); // Case-insensitive search
        }
        if (req.query.uid) {
            query.TopicUID = req.query.uid;
        }

        const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided

        const topics = await Topic.find(query).sort({ createdAt: -1 }).limit(limit);
        res.status(200).json(topics);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single topic by UID
exports.getTopicByUID = async (req, res) => {
    try {
        const topic = await Topic.findOne({ TopicUID: req.params.uid });
        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }
        res.json(topic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new topic
exports.createTopic = async (req, res) => {
    try {
        const { TopicUID } = req.body;

        // Check if the topic already exists
        const existingTopic = await Topic.findOne({ TopicUID });
        if (existingTopic) {
            return res.status(400).json({ error: 'Topic already exists' });
        }

        const topic = new Topic(req.body);

        await topic.save();
        res.status(201).json(topic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a topic by UID
exports.updateTopic = async (req, res) => {
    try {
        const topic = await Topic.findOneAndUpdate(
            { TopicUID: req.params.uid },
            req.body,
            { new: true }
        );
        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }
        res.json(topic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
