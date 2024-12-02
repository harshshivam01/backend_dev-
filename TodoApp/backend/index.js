const express = require("express");
const cors = require("cors");
const { dbConn } = require("./connection/dbConn");
const { todoRouter } = require("./Route/todoRoute");
const { userRouter } = require("./Route/userRoute");

const app = express();
const port = 5050;

dbConn("todo_db");

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);
app.use("/api/todo", todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
