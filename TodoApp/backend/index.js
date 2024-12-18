const express = require("express");
const cors = require("cors");
const  run  = require("./connection/dbConn");
const { todoRouter } = require("./Route/todoRoute");
const { userRouter } = require("./Route/userRoute");


const app = express();
const port = 5050;

run('todo_db').then(() => console.log('Connection successful')).catch(console.error);



app.use(cors({
    origin: 'https://backend-dev-git-main-harshshivam02s-projects.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Ensure credentials are allowed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);
app.use("/api/todo", todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
