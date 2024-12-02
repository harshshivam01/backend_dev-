const mongoose = require("mongoose");

const dbConn=((db_name)=>{
    mongoose.connect(`mongodb://localhost:27017/${db_name}`)
    .then(()=>{
        console.log(`Connected to ${db_name} database`);
    })
    .catch((err)=>{
        console.log( `Error connecting to ${db_name} database`,err);
    })
})

module.exports={dbConn}