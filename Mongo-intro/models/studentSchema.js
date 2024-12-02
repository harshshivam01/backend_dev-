const { default: mongoose } = require("mongoose");

const studentSchema = new mongoose.Schema({
  
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
     
    },
    grade: {
      type: String,
    },
  }, {timestamps: true});
  
  const Studentsdata = new mongoose.model("Student", studentSchema);

  module.exports = {Studentsdata};


// In your express server file