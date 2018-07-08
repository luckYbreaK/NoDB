require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const disneyCtrl = require("./controllers/disney_controllers");
const axios = require('axios');

const app = express();

// app.use() --> middleware that runs for EVERY request
app.use(bodyParser.json());

// === ENDPOINTS ===
app.get("/api/attractions", disneyCtrl.readAttractions);
app.get("/api/ride/:description", disneyCtrl.readRide);
app.get("/api/dining", disneyCtrl.readDining);
app.get("/api/restaurant/:description", disneyCtrl.readRestaurant);
app.post("/api/attractions", disneyCtrl.createTodoAttractions);
app.post("/api/dining", disneyCtrl.createTodoDining);
// app.put();
app.delete("/api/attractions/:id", disneyCtrl.deleteRide);
app.delete("/api/dining/:id", disneyCtrl.deleteRestaurant);
// === ENDPOINTS ===

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port: ${process.env.SERVER_PORT}`);
});