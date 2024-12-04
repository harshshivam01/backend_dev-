const express = require("express");
const todoRouter = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { getTodoList, createTodo, updateTodo, deleteTodo } = require("../controller/todoList-Controller");


todoRouter.use(authenticateToken);

todoRouter
    .route("/")
    .get(getTodoList)
    .post(createTodo);

todoRouter
    .route("/:id")
    .patch(updateTodo)
    .delete(deleteTodo);

module.exports = { todoRouter };