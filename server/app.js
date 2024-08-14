/*
app.js


*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
})

// Routes
app.use('/api/notes', require('./routes/noteRoutes')); //Mount all noteRoutes to '/api/notes'

module.exports = app;