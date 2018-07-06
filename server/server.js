const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// app.use() --> middleware that runs for EVERY request
app.use(bodyParser.json());

// === ENDPOINTS ===
// app.get();
// app.post();
// app.put();
// app.delete();
// === ENDPOINTS ===

const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});