const { db, admin } = require('../util/admin');
var csv = require("csvtojson");
const axios = require("axios");


exports.updateWind = (req, res) => {
    csv()
        .fromFile("./data/Counties.csv")
        .then(function(jsonArrayObj) {
            jsonArrayObj.forEach((county) => {
                county['Longitude'] = county['Longitude'].substring(1);
                // Create object in firestore
                db.collection('counties')
                    .add(county)
                    .then(doc => {
                        console.log(`Added county ${county["County"]}`);
                    })
                    .catch(err => {
                        res.status(500).json({error : 'something went wrong'});
                    })
                })
        })
    return res.send("Weather Updated");
};

// DID 0 - 899
exports.updateSolar = (req, res) => {
    csv()
        .fromFile("./data/Counties.csv")
        .then(function(jsonArrayObj) {
            for(let i = 0; i < 100; i++) {
                let county = jsonArrayObj[i];
                county['Longitude'] = county['Longitude'].substring(1);
                county['Longitude'] = '-' + county['Longitude'];
                let name = county['County'];
                // Get solar data
                let lat = parseFloat(county['Latitude']);
                let lon = parseFloat(county['Longitude']);
                axios.get(`https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=67wxkb5ud02RhUhRK4S8VgcG9YjPVPmWP6yO1ehn&lat=${lat}&lon=${lon}`).then(resp => {
                    solar = resp.data["outputs"]["avg_dni"]["annual"];
                    db.collection("counties").where("County", "==", county["County"]).where("State", "==", county["State"]).get()
                    .then(query => {
                        query.docs[0].ref.update({solar});
                        console.log(`Updated ${name} succesfully`)
                        updated++;
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'something went wrong'});
                        console.error(err);
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);
        })
    return res.send(`Weather Updated`);
};