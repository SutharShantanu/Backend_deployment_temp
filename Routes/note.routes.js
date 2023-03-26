const express = require("express");
const { NoteModel } = require("../Models/note.model");
const noteRouter = express.Router();
const jwt = require("jsonwebtoken");

noteRouter.get("/", async (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "Batman");
    try {
        if (decoded) {
            const notes = await NoteModel.find({ userId: decoded.userId });
            res.status(200).send(notes);
        }
    } catch (error) {
        res.status(404).send({ msg: error.message });
    }
});

noteRouter.post("/addnote", async (req, res) => {
    const payload = req.body;
    try {
        const note = new NoteModel(payload);
        await note.save();
        res.status(200).send({ msg: "Note saved" });
    } catch (error) {
        res.status(404).send({ msg: error.message });
    }
});

noteRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    try {
        await NoteModel.findByIdAndUpdate(id, payload);
        res.status(200).send({ msg: "Note updated" });
    } catch (error) {
        res.status(404).send({ msg: error.message });
    }
});

noteRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "Batman");
    const req_id = decoded.userId;
    const note = NoteModel.findOne({ _id: id });
    const userID_in_note = note.userId;
    try {
        if (req_id == userID_in_note) {
            await NoteModel.findByIdAndDelete(id);
            res.status(200).send({ msg: "Note Deleted" });
        } else {
            res.status(404).send({ msg: "Not Authorized" });
        }
    } catch (error) {
        res.status(404).send({ msg: error.message });
    }
});

module.exports = { noteRouter };
