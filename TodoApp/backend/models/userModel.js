 
 const mongoose = require('mongoose');

 const userDetails = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
 },{timeStamp:true});

 const user= new mongoose.model('user',userDetails);

 module.exports = user;