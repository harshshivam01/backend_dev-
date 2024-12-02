const mongoose = require('mongoose');
function startMongoDB(database_name){
    mongoose
    .connect("mongodb://127.0.0.1:27017/"+database_name)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB :" + err.message);
    });
}

module.exports={startMongoDB}