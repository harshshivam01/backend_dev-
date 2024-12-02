const express = require("express");
const fs = require("fs");
const path = require("path");
const mymiddleware = require("./middlewares/test");
const { startMongoDB } = require("./connection/index");
const studentRouter = require("./route/studentRoute");

 
const app = express();
const port = 3000;

startMongoDB("studentsdb");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(mymiddleware);
app.use('/api/student',studentRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
