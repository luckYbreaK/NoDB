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
//quotes array
let quotes = [{id: 0,movie: "Pinocchio",quote: "Always let your conscience be your guide."},{id: 1,movie: "The Little Mermaid",quote: "The seaweed is always greener in somebody else’s lake."},{id: 2,movie: "The Hunchback of Notre Dame",quote: "If watching is all you’re gonna do, then you’re gonna watch your life go by without ya."},{id: 3,movie: "Alice in Wonderland",quote: "Why, sometimes I’ve believed as many as six impossible things before breakfast."},{id: 4,movie: "Cinderella",quote: "If you keep on believing, the dreams that you wish will come true."},{id: 5,movie: "Mary Poppins",quote: "Open different doors, you may find a you there that you never knew was yours. Anything can happen."},{id: 6,movie: "The Lion King",quote: "You must take your place in the Circle of Life."},{id: 7,movie: "Dumbo",quote: "The very things that hold you down are going to lift you up."},{id: 8,movie: "Finding Nemo",quote: "Just keep swimming!"},{id: 9,movie: "Beauty and the Beast",quote: "She warned him not to be deceived by appearances, for beauty is found within."},{id: 10,movie: "Snow White and the Seven Dwarfs",quote: "Whistle while your work."},{id: 11,movie: "Aladdin",quote: "You’re only a fool if you give up."},{id: 12,movie: "Lady and the Tramp",quote: "There’s a great big hunk of world down there with no fence around it."},{id: 13,movie: "Jungle Book",quote: "And don’t spend your time lookin’ around for something you want that can’t be found."},{id: 14,movie: "Sleeping Beauty",quote: "They say if you dream a thing more than once it’s sure to come true."},{id: 15,movie: "The Fox and the Hound",quote: "Darlin, forever is a long, long time, and time has a way of changing things."},{id: 16,movie: "Peter Pan",quote: "Think happy thoughts."},{id: 17,movie: "Bambi",quote: "If you cannot say something nice, don’t say nothing at all."},{id: 18,movie: "The Sword in the Stone",quote: "For every to, there is a fro. For every stop there is a go, and that’s what makes the world go round."}]


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
    },
    readQuery: (req, res) => {
        let quote = "";
        
        quotes.forEach( (movie,i) => {
            if(movie.movie === req.query.movie) {
                quote = movie.quote;
               return res.status(200).send(quote);
            } 
            
        });
        
        return res.status(400).send(`Sorry, no quotes for ${req.query.movie} yet :(`);
    }
}