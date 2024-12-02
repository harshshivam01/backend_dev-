const express= require('express');

const {
    
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent,
} = require('../controllers/Student');

    const studentRouter=express.Router();

    studentRouter
    .route("/")
    .get(getStudents)
    .post(createStudent)
    .patch(updateStudent)
    .delete(deleteStudent);

    module.exports = studentRouter;


