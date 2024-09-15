// controllers/topicController.js
const Topic = require('../models/topic');

let recentTopicsCache = [];

// Get most recent topics or search topics by name or UID
exports.getRecentTopics = async (req, res) => {
    try {
        const query = {};
        if (req.query.name) {
            query.TopicName = new RegExp(req.query.name, 'i'); // Case-insensitive search
        }
        if (req.query.uid) {
            query.TopicUID = req.query.uid;
        }

        let limit = parseInt(req.query.limit);
        if (!limit || limit <= 0) {
            limit = null; // No limit if limit is 0, null, or undefined
        }

        // If there are enough items in the cache, return the cache
        if (!req.query.name && !req.query.uid && recentTopicsCache.length >= 10) {
            const topicsToReturn = limit ? recentTopicsCache.slice(0, limit) : recentTopicsCache;
            return res.status(200).json(topicsToReturn);
        }

        // If the cache has fewer than 10 items, fetch from the database
        const topics = await Topic.find(query).sort({ createdAt: -1 }).limit(limit || 10);

        // Update the cache if we're fetching the most recent topics without filtering
        if (!req.query.name && !req.query.uid && topics.length > 0) {
            recentTopicsCache = topics.slice(0, 10); // Cache only the 10 most recent topics
        }

        res.status(200).json(topics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Function to update the recentTopicsCache manually when a new topic is created
exports.updateRecentTopicsCache = async () => {
    try {
        const topics = await Topic.find().sort({ createdAt: -1 }).limit(10);
        recentTopicsCache = topics;
    } catch (err) {
        console.error('Failed to update recentTopicsCache:', err.message);
    }
};

// Get all topics
exports.getAllTopics = async (req, res) => {
    try {
        const query = {};
        if (req.query.name) {
            query.TopicName = new RegExp(req.query.name, 'i'); // Case-insensitive search
        }
        if (req.query.uid) {
            query.TopicUID = req.query.uid;
        }

        const topics = await Topic.find(query).sort({ TopicName: 1 });
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

        // Create and save the new topic
        const topic = new Topic(req.body);
        await topic.save();

        // Update the recentTopicsCache
        recentTopicsCache.unshift(topic); // Add the new topic to the start of the cache
        if (recentTopicsCache.length > 10) {
            recentTopicsCache.pop(); // Remove the oldest topic if the cache exceeds 10 items
        }

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
