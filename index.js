const express = require("express");
const app = express();
require("dotenv").config();
const client = require("./db/client");
client.connect();
const PORT = 3000; 



app.use(express.json());
// We;re registering the routes in /api/index.js =>
app.use("/api", require("./api"));

app.get("/" , (req, res) => {
    res.send("Hello from our server")
});

app.listen(PORT, () => {
    console.log(`Server alive on port ${PORT}`);
});