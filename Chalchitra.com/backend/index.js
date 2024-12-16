require("dotenv").config();
const cors = require("cors");
const connectDB = require("./utils/connection");
const http = require("http");
const express = require("express");
const userRoute = require("./routes/userRoute");

const server = express();
let PORT = process.env.PORT || 5050;

// ------------------ Middlewares ------------------

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(express.static("public"));

// ------------------ Routes Configuration Middlewares ------------------
connectDB(process.env.DB_NAME);
server.use("/users", userRoute);


// ------------------ Server Listning & It's Error Handling ------------------

const httpServer = http.createServer(server);
function listen() {
  httpServer.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}
httpServer.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log("Port " + PORT + " is already in use...");
    PORT = PORT + 1;
    console.log("Retrying with port " + PORT + "...");
    listen();
  }
});

// ------------------ Server Listning Call ------------------

// server.listen(PORT, () => {
//   console.log("Server is running on port " + PORT);
// });

listen();

