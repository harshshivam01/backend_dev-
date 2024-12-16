const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
   quantity: {
    type: Number,
    required: true,
   },
  
})

const cartItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [cartSchema],
    totalPrice: {
        type: Number,
        default: 0,
        
    },
   
   


},{
    timestamps: true,
});

const Cart = mongoose.model("Cart", cartItemSchema);


module.exports = Cart;


