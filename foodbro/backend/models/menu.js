const mongoose = require('mongoose');

const menuSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
       
    },
    category: {
        type: String,
        required: true
    },
    isveg:{
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        default: "https://www.clipartmax.com/png/middle/324-3246886_kitchen-cartoon-plate-knife-and-fork.png",
    },
    rating: {
        type: Number,
        required: true,
        default: 0
       
    },
    details:{
        type: String,
       
    },
    discountPercentage:{
        type: Number,
        required: true,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        }
    }],
    availableQty:{
        type: Number,
        required: true
    },
    resId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }



},{timestamps:true});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;