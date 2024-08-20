const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Example root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import and use your routes here
const noteRoutes = require('./routes/noteRoutes');
app.use('/api/notes', noteRoutes);

module.exports = app;
