const functions = require("firebase-functions");
// Bring in Express
const express = require('express');
const app = express();
// Bring in handlers
const {getDemo, postDemo} = require('./handlers/test');
const {updateWind, updateSolar} = require('./handlers/weather');

// ==================== ROUTES ====================
// Demo routes
    // get request
app.get('/getDemo', getDemo);
app.get('/updateWind', updateWind);
app.get('/updateSolar', updateSolar);
    // post request
app.post('/postDemo', postDemo);

exports.api = functions.https.onRequest(app);