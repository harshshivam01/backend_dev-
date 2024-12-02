const { Studentsdata } = require("../models/studentSchema");

function getStudents(req, res) {
    
    Studentsdata.find({})
     .then((students) => {
        res.send(students);
        console.log("data : ", students);
      })
     .catch((err) => {
        console.error("Error fetching students:", err);
        res.status(500).send("An error occurred while fetching students");
      });

   
  }

  function createStudent(req, res) {
    const { name, age, grade } = req.body;
    console.log(req.body)

    Studentsdata.create({
      name,
      age: Number(age),
      grade,
    })
      .then((result) => {
        res.send({
          status: 'success',
          message: "Student added successfully",
          data: result,

        });
        console.log(result) ;
      })
      .catch((err) => {
        console.error("Error adding student:", err);
        res.status(500).send({msg: "An error occurred while adding the student", ...err});
      });
  }

  function updateStudent(req, res)  {
    const { id,name, age, grade } = req.body;
    Studentsdata.findByIdAndUpdate(id,{name, age, grade}).then((data) => {
      res.send({
        message:`Student with id ${id} updated successfully`,
        data: data,
      });

    }).catch((err) => {
      console.error("Error updating student:", err);
      res.status(500).send("An error occurred while updating the student");
    })


  }

  function deleteStudent(req, res) {
    const { id } = req.body;
    Studentsdata.findByIdAndDelete(id).then((result) => {
     
      res.send({
        message:`Student with id ${id} deleted successfully`,
        data: result,

      });

    }).catch((err) => {
      console.error("Error deleting student:", err);
      res.status(500).send("An error occurred while deleting the student");

    });
   
  }

  module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };


