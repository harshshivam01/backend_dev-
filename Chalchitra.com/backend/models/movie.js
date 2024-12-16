const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
            },
    duration: {
        type: Number,
        required: [true, "Duration is required"],
        },
    releaseDate: {
        type: Date,
        required: [true, "Release date is required"],
    },
    genre: {
        type: [String],
        required: [true, "Genre is required"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
    },
    cast: {
        type: [String],
        required: [true, "Cast is required"],
    },
    trailerUrl: {
        type: String,
        required: [true, "Trailer URL is required"],
    },
    poster: {
        type: String,
        required: [true, "Poster is required"],
    },
    language: {
        type: String,   
        required: [true, "Language is required"],
    },
    addedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Added by is required"],
    },
},{
    timestamps: true,
});

const movie = mongoose.model("movie", movieSchema);

module.exports = movie;