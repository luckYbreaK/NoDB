const axios = require("axios");


module.exports = {
    readAttractions : (req, res) => {
        let promise = axios.get("http://touringplans.com/magic-kingdom/attractions.json");
        promise.then( result => {
            res.status(200).send(result.data);
        });
    },
    readRide : (req, res) => {
        let promise = axios.get(`http://touringplans.com/magic-kingdom/attractions/${req.params.description}.json`);
        promise.then( result => {
            res.status(200).send(result.data);
        });
    },
    readDining : (req, res) => {
        let promise = axios.get("http://touringplans.com/magic-kingdom/dining.json");
        promise.then( result => {
            res.status(200).send(result.data);
        });
    },
    readRestaurant : (req, res) => {
        let promise = axios.get(`http://touringplans.com/magic-kingdom/dining/${req.params.description}.json`);
        promise.then( result => {
            res.status(200).send(result.data);
        });
    }
}