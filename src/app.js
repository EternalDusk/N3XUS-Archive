const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/notes', require('./routes/noteRoutes'));

module.exports = app;