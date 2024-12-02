const mongoose = require("mongoose");

const connectDB = async (DB_NAME) => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`,{
        
    });
    console.log(`[${new Date().toISOString()}] MongoDB connected to ${DB_NAME}`);


  } catch (error) {
    console.error({
      message: "MongoDB connection error",
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = connectDB;
