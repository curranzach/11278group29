const functions = require("firebase-functions");
// Bring in Express
const express = require('express');
const app = express();
// Bring in handlers
const {getDemo} = require('./handlers/test');
const {postDemo} = require('./handlers/test');

// ==================== ROUTES ====================
// Demo routes
    // get request
app.get('/getDemo', getDemo);
    // post request
app.post('/postDemo', postDemo);

exports.api = functions.https.onRequest(app);