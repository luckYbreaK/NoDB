const axios = require("axios");

//array of objects
let todo_attractions = [];
let ride_id = 0;
//array of objects
let todo_dining = [];
let restaurant_id = 0;
//array of objects
let notes = [];
let note_id = 0;


module.exports = {
    readAttractions: (req, res) => {
        let promise = axios.get("http://touringplans.com/magic-kingdom/attractions.json");
        promise.then(result => {
            res.status(200).send(result.data);
        });
    },
    readRide: (req, res) => {
        let promise = axios.get(`http://touringplans.com/magic-kingdom/attractions/${req.params.description}.json`);
        promise.then(result => {
            res.status(200).send(result.data);
        });
    },
    readDining: (req, res) => {
        let promise = axios.get("http://touringplans.com/magic-kingdom/dining.json");
        promise.then(result => {
            res.status(200).send(result.data);
        });
    },
    readRestaurant: (req, res) => {
        let promise = axios.get(`http://touringplans.com/magic-kingdom/dining/${req.params.description}.json`);
        promise.then(result => {
            res.status(200).send(result.data);
        });
    },
    createTodoAttractions: (req, res) => {
        let { name } = req.body;
        //Create an object with a unique id and the attraction name
        let ride = {
            id: ride_id++,
            name: name
        }
        todo_attractions.push(ride);
        res.status(200).send(todo_attractions)
    },
    createTodoDining: (req, res) => {
        let { name } = req.body;
        //Create an object with a unique id and the restaurant name
        let restaurant = {
            id: restaurant_id++,
            name: name
        }
        todo_dining.push(restaurant);
        res.status(200).send(todo_dining)
    },
    creatNote: (req, res) => {
        let { text } = req.body;
        //Create an object with a unique id and the restaurant name
        let note = {
            id: note_id++,
            text: text
        }
        notes.push(note);
        res.status(200).send(notes)
    },
    deleteRide: (req, res) => {
        todo_attractions.forEach((obj, i) => {
            if (obj.id === parseInt(req.params.id)) todo_attractions.splice(i, 1)
        });
        res.status(200).send(todo_attractions);
    },
    deleteRestaurant: (req, res) => {
        todo_dining.forEach((obj, i) => {
            if (obj.id === parseInt(req.params.id)) todo_dining.splice(i, 1)
        });
        res.status(200).send(todo_dining);
    },
    updateNote: (req, res) => {
        notes.forEach((note, i) => {
            if (note.id === parseInt(req.params.id)) {
                notes[i] = {
                    id : notes[i].id,
                    text: req.body.text
                }
            }
        });
        res.status(200).send(notes);
    }
}