const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required"],
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "theater",
        required: [true, "Theater is required"],
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
        required: [true, "Movie is required"],
    },
    bookingDate: {
        type: Date,
        required: [true, "Booking date is required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    status: {
        type: String,
        enum: [ "confirmed", "cancelled"],
        default: "cancelled",
    },
    screen: {
        type: String,
      
        required: [true, "Screen is required"],
    },
    timing: {
        type: String,
        required: [true, "Timing is required"],
    },
    seats: {
        type: [Number],
        required: [true, "Seats are required"],
    },

});

const booking = mongoose.model("booking", bookingSchema);

module.exports = booking;

