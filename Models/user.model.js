const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email: String,
    pass: String,
    location: String,
    age: Number,
});

const userModel = mongoose.model("auth_user", userSchema);
const MoviesSchema = mongoose.Schema({
    title: String,
    genre: String,
    director: String,
    rating: Number,
});
const MovieModel = mongoose.model("movie", MoviesSchema);

module.exports = {
    userModel,
    MovieModel,
};
