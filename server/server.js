/*
server.js

Connects with the mongodb database,
 then starts the Express app setup
*/


const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

//env variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI, {
    //no configs needed
}).then(() => {
    console.log('Connected to MongoDB');
    // starts express server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection error:', err);
});