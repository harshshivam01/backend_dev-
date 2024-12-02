// const express = require("express");



// const serverConfig = express();
// serverConfig.use(express.urlencoded({ extended: false }));
// serverConfig.use("/assets", express.static("assets"));

// serverConfig.get('/', (req, res)=>{
//     res.send('Hello, World! from express!');
// });
// serverConfig.get('/products', (req, res)=>{
//     res.send("you have sent a get request!");
// });

// serverConfig.post('/products', (req, res)=>{
//     const {apikey,city}=req.body;

//     res.send(`you have sent a post request! with api key as  ${apikey} and city as ${city}`);
// });
// Define the port number for the server

// serverConfig
//   .route("/products")
//   .get((req, res) => {
//     res.send("you have sent a get request!");
//     console.log(`GET request received at ${new Date()}`);
//   })
//   .put( (req, res) => {
//     res.send("you have sent a put request!");
//     console.log(`PUT request received at ${new Date()}`);
//   })
//   .post( (req, res) => {
//     const { apikey, city } = req.body;
//     res.json(
//       `you have sent a post request! with api key as  ${apikey} and city as ${city}`
//     );
//   })
//   .patch( (req, res) => {
   
//     res.send(
//       `you have sent a patch request! `
//     );
//   })

//   .delete( (req, res) => {
//     const { id } = req.body;
//     res.send(`you have sent a delete request! with id as  ${id}`);
//   });


//   serverConfig.get("/products/:productid", (req,res) => {
//     const { productid } = req.params;
//     res.send(`You have requested product with id ${productid}`);
//   })
//   serverConfig.get("/products/:productid/:reviewsid", (req,res) => {
//     const { productid, reviewsid } = req.params;
//     res.send(`You have requested reviews for product with id ${productid} and review id ${reviewsid}`);
//   })

// const port = 3000;

// // Start the server on the specified port

// serverConfig.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });



const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.route('/student')
  .get((req, res) => {
    const data = fs.readFileSync(path.join(__dirname, 'assets', 'student.json'));
    const students = JSON.parse(data);
    res.send(students);
    console.log("data : ",students);
  })
  .post((req, res) => {
    const { name, age, grade } = req.body;
    if (name) {
      const data = fs.readFileSync(path.join(__dirname, 'assets', 'student.json'));
      const students = JSON.parse(data);
      const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name,
        age,
        grade
      };
      students.push(newStudent);
      fs.writeFileSync(path.join(__dirname, 'assets', 'student.json'), JSON.stringify(students));
      res.send(`Student ${name} added successfully`);
    } else {
      console.log('Name is not available');
      res.send('Name is required');
    }
  })
  .patch((req, res) => {
    const { id, name, age, grade } = req.body;
    
    if (!id) {
      return res.status(400).send('Student ID is required');
    }
  
    try {
      const data = fs.readFileSync(path.join(__dirname, 'assets', 'student.json'));
      let students = JSON.parse(data);
      
      const index = students.findIndex((s) => s.id === parseInt(id));
      
      if (index === -1) {
        return res.status(404).send('Student not found');
      }
  
      
      if (name) students[index].name = name;
      if (age) students[index].age = age;
      if (grade) students[index].grade = grade;
  
      fs.writeFileSync(path.join(__dirname, 'assets', 'student.json'), JSON.stringify(students, null, 2));
      
      res.send(`Student with id ${id} updated successfully`);
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).send('An error occurred while updating the student');
    }
  })  .delete((req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).send('Student ID is required');
    }
    const data = fs.readFileSync(path.join(__dirname, 'assets', 'student.json'));
    const students = JSON.parse(data);
    const index = students.findIndex(s => s.id === parseInt(id));
    if (index === -1) {
      res.send('Student not found');
    } else {
      students.splice(index, 1);
      fs.writeFileSync(path.join(__dirname, 'assets', 'student.json'), JSON.stringify(students));
      res.send(`Student with id ${id} deleted successfully`);
    }
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});