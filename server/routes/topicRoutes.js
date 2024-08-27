// routes/topicRoutes.js
const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Routes for topics - specific searching
router.get('/fetch/:uid', topicController.getTopicByUID); // Get a topic by UID
router.put('/update/:uid', topicController.updateTopic); // Update a topic by UID

// Routes for topics - general searching
router.get('/fetchAll', topicController.getRecentTopics); // List all topics or search by name/UID
router.post('/create', topicController.createTopic); // Create a new topic

module.exports = router;
