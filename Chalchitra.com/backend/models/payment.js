const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking",
        required: [true, "Booking is required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "debit_card", "upi", "net_banking"],
        required: [true, "Payment method is required"],
    },  
    paymentDate: {
        type: Date,
        required: [true, "Payment date is required"],
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },

});


const payment = mongoose.model("payment", paymentSchema);

module.exports = payment;
