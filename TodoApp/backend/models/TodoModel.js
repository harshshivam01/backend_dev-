const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  completed: {
    type: Boolean,
    default: false,
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' ,
    required: true
  }
}, {timestamps: true});

const Todo = new mongoose.model("Todo", todoSchema);

module.exports = Todo;
