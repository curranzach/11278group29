const functions = require("firebase-functions");
const cors = require('cors');
// Bring in Express
const express = require('express');
const app = express();
app.use(cors())
// Bring in handlers
const {updateWind, updateSolar, getData, getWater, getWind, getSolar} = require('./handlers/weather');

// ==================== ROUTES ====================
// Demo routes
    // get request
app.get('/updateWind', updateWind);
app.get('/updateSolar', updateSolar);
app.get('/getData', getData);
app.get('/getWater', getWater);
app.get('/getWind', getWind);
app.get('/getSolar', getSolar);

exports.api = functions.https.onRequest(app);