const express = require("express");


const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
    res.send("Here are your books");
});

module.exports = bookRouter;