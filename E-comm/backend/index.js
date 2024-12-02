const connectDB = require("./connection/mongocon");
const express = require("express");
const cors = require("cors");
const productRouter = require("./route/productRoute");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB("E-comm");
app.use("/product", productRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
