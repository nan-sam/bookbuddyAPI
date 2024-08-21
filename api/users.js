const express = require("express");
const userRouter = express.Router();

//{baseURL}/users/me
userRouter.get("/me", (req,res) => {
    res.send("here is your account info");
});

userRouter.post("/register", (req, res) => {
    console.log("REQUEST BODY", req.body)
    res.send("User registered");
});

userRouter.post("/login", (req, res) => {
    console.log("REQUEST BODY", req.body);
    res.send("You logged in successfully")
})

module.exports = userRouter;