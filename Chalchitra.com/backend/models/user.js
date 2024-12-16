 const mongoose = require("mongoose");

 const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    mobile: {
        type: String,
        
        trim: true,
    },
    role:{
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
  
 },{
    timestamps: true,
 });

 const user = mongoose.model("user", userSchema);

 module.exports = user;