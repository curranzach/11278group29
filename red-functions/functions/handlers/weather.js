const { db, admin } = require('../util/admin');
var csv = require("csvtojson");
const axios = require("axios");


exports.updateWind = (req, res) => {
    csv()
        .fromFile("./data/Counties.csv")
        .then(function(jsonArrayObj) {
            jsonArrayObj.forEach((county) => {
                county['Longitude'] = county['Longitude'].substring(1);
                county['Latitude'] = parseFloat(county['Latitude']);
                county['Longitude'] = parseFloat(county['Longitude']);
                county['Water Area (sq mi)'] = parseFloat(county['Water Area (sq mi)']);
                county['Wind Speed (mph)'] = parseFloat(county['Wind Speed (mph)']);
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

// DID through 2500 (do 2-25 one more time)
exports.updateSolar = (req, res) => {
    let Solar = 1;
    csv()
        .fromFile("./data/Counties.csv")
        .then(function(jsonArrayObj) {
            for(let i = 1500; i < 2000; i++) {
                let county = jsonArrayObj[i];
                county['Longitude'] = county['Longitude'].substring(1);
                county['Longitude'] = '-' + county['Longitude'];
                let name = county['County'];
                // Get solar data
                let lat = county['Latitude'];
                let lon = county['Longitude'];
                axios.get(`https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=67wxkb5ud02RhUhRK4S8VgcG9YjPVPmWP6yO1ehn&lat=${lat}&lon=${lon}`).then(resp => {
                    Solar = resp.data["outputs"]["avg_dni"]["annual"];
                    db.collection("counties").where("County", "==", county["County"]).where("State", "==", county["State"]).get()
                    .then(query => {
                        query.docs[0].ref.update({Solar});
                        console.log(`Updated ${name} succesfully`)
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'something went wrong'});
                        //console.error(err);
                    })
                }).catch(err => {
                    //console.log(err);
                })
            }
        }).catch(err => {
            //console.log(err);
        })
    return res.send(`Weather Updated`);
};

exports.getData = (req, res) => {
    db.collection(`counties`)
    .get()
    .then(data => {
        counties = [];
        data.forEach(doc => {
            //console.log(doc.data());
           counties.push({
               county: doc.data()["County"],
               state: doc.data()["State"],
               lat: doc.data()["Latitude"],
               lon: doc.data()["Longitude"] * -1.0,
               area: (Math.sqrt(parseFloat(totArea) * 2590000) / 2.0).toFixed(2),
               pop: doc.data()["Population"],
               wind: doc.data()["Wind Speed (mph)"],
               water: doc.data()["Water Area (sq mi)"],
               Solar: doc.data()["solar"],
           });
        });
        return res.json(counties);
        }).catch(err => console.error(err));
}

exports.getWater = (req, res) => {
    db.collection('counties')
        .orderBy("Water Area (sq mi)", "desc")
        .limit(500)
        .get()
        .then(data => {
            counties = [];
            data.forEach(doc => {
                //console.log(doc.data());
                let totArea =  doc.data()["Total Area (sq mi)"].split(',').join('')
               counties.push({
                   county: doc.data()["County"],
                   state: doc.data()["State"],
                   lat: doc.data()["Latitude"],
                   lon: doc.data()["Longitude"] * -1.0,
                   area: (Math.sqrt(parseFloat(totArea) * 2590000) / 2.0).toFixed(2),
                   pop: doc.data()["Population"],
                   wind: doc.data()["Wind Speed (mph)"],
                   water: doc.data()["Water Area (sq mi)"],
                   solar: doc.data()["Solar"],
               });
            });
            return res.json(counties);
        }).catch(err => console.error(err));
}

exports.getWind = (req, res) => {
    db.collection("counties")
        .orderBy("Wind Speed (mph)", "desc")
        .limit(500)
        .get()
        .then(data => {
            counties = [];
            data.forEach(doc => {
                //console.log(doc.data());
                let totArea =  doc.data()["Total Area (sq mi)"].split(',').join('')
               counties.push({
                   county: doc.data()["County"],
                   state: doc.data()["State"],
                   lat: doc.data()["Latitude"],
                   lon: doc.data()["Longitude"] * -1.0,
                   area: (Math.sqrt(parseFloat(totArea) * 2590000) / 2.0).toFixed(2),
                   pop: doc.data()["Population"],
                   wind: doc.data()["Wind Speed (mph)"],
                   water: doc.data()["Water Area (sq mi)"],
                   solar: doc.data()["Solar"],
               });
            });
            return res.json(counties);
        }).catch(err => console.error(err));
}

exports.getSolar = (req, res) => {
    db.collection("counties")
        .orderBy("Solar", "desc")
        .limit(500)
        .get()
        .then(data => {
            counties = [];
            data.forEach(doc => {
                //console.log(doc.data());
                let totArea =  doc.data()["Total Area (sq mi)"].split(',').join('')
               counties.push({
                   county: doc.data()["County"],
                   state: doc.data()["State"],
                   lat: doc.data()["Latitude"],
                   lon: doc.data()["Longitude"] * -1.0,
                   area: (Math.sqrt(parseFloat(totArea) * 2590000) / 2.0).toFixed(2),
                   pop: doc.data()["Population"],
                   wind: doc.data()["Wind Speed (mph)"],
                   water: doc.data()["Water Area (sq mi)"],
                   solar: doc.data()["Solar"],
               });
            });
            return res.json(counties);
        }).catch(err => console.error(err));
}