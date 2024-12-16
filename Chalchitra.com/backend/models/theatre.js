const mongoose = require("mongoose");

const theaterSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        default: 0,
    },
    screens: [
        {
            movie: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "movie",
                required: [true, "Movie is required"],
            },
            showTimings: {
                type: [Date],
                required: [true, "Show timings are required"],
            },
            seats: {
                type: Number,
                required: [true, "Seats are required"],
            },
            price: {
                type: Number,
                required: [true, "Price is required"],
            }


        }
    ],

});

const theater = mongoose.model("theater", theaterSchema);

module.exports = theater;

