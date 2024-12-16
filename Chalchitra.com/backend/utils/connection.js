const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async (DB_NAME) => {
  await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
  console.log("Connected to MongoDB");
};

module.exports = connectDB;
