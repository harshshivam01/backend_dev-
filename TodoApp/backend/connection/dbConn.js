const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongoDb = async (dbName) => {
  const url = `${process.env.DB_CON_STRING}${dbName}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = { connectToMongoDb };

// // Connection URI without special characters



// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run(dbName) {
//     const url = `${process.env.DB_CON_STRING}${dbName}?retryWrites=true&w=majority`;

//   try {
//     // Connect the client to the server
//     await client.connect();

//     // Use the dbName parameter to select the database
//     const database = client.db(dbName);

//     // Ping the database to confirm connection
//     await database.command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);
//   } finally {
//     // Ensure the client will close when you finish/error
//     await client.close();
//   }
// }

// module.exports = run;

module.exports=connectToMongoDb;
