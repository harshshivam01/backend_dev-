const mongoose = require('mongoose');
require('dotenv').config();


exports.connectMongoDB=((database_name="")=>{
    const connectionUrl=`${process.env.MONGODB_URL}${process.env.MONGODB_DB || database_name}`;
    console.log(connectionUrl);
    mongoose
    .connect(connectionUrl)
   .then(()=>{
     console.log(`Connected to MongoDB`);
   }).catch((err)=>{
     console.log("Failed to connect to MongoDB :" + err.message);
   })

})