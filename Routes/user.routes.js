const express = require("express");
const userRouter = express.Router();
const { userModel, MovieModel } = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
    const { email, pass, location, age } = req.body;
    try {
        bcrypt.hash(pass, 3, async (err, hash) => {
            let newUser = new userModel({ email, pass: hash, location, age });
            await newUser.save();
            res.status(200).send({ msg: "Registration has been done!" });
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    res.status(200).send({
                        msg: "login successful",
                        token: jwt.sign({ userId: user._id }, "Batman"),
                    });
                } else {
                    res.status(400).send({ msg: "login failed" });
                }
            });
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

userRouter.get("/", async (req, res) => {
    const token = req.headers.authorization;
    const data = await MovieModel.find();
    jwt.verify(token, "Batman", (err, decoded) => {
        decoded
            ? res.status(200).send(data)
            : res.status(400).send({ msg: "cannot access" });
    });
});

userRouter.post("/adduser", (req, res) => {
    const payload = req.body;
    const token = req.headers.authorization;
    jwt.verify(token, "Batman", (err, decoded) => {
        if (decoded) {
            let newUser = new MovieModel(payload);
            newUser.save();
            res.status(200).send({ msg: "User created successfully" });
        } else {
            res.status(400).send({
                msg: "cannot access without authorization",
            });
        }
    });
});

module.exports = { userRouter };
