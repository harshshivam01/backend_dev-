const Todo = require("../models/TodoModel");

function getTodoList(req, res) {
  Todo.find({})
    .then((todos) => {
      res.send(todos);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function createTodo(req, res) {
  const { title, description } = req.body;
  Todo.create({
    title,
    description,
    completed: false,
  })
    .then((todo) => {
     
      res.status(201).send({
        status: "success",
        message: "Todo created successfully",
        data: todo,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
      res.status(500).send({
        status: "error",
        message: "Todo creation failed",
        error: err,
      });
    });
}

function updateTodo(req, res) {
  const { title, description, completed } = req.body;
  const id = req.params.id;

  Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
  )
  .then((todo) => {
      if (!todo) {
          return res.status(404).send({
              status: "error",
              message: "Todo not found",
          });
      }
      res.status(200).send({
          status: "success",
          message: "Todo updated successfully",
          data: todo,
      });
  })
  .catch((err) => {
      res.status(500).send({
          status: "error",
          message: "Todo update failed",
          error: err.message,
      });
  });
}

function deleteTodo(req, res) {
    const id = req.params.id;
    Todo.findByIdAndDelete(id)
    .then((todo)=>{
        res.status(200).send({
            status: "success",
            message: "Todo deleted successfully",
            data: todo,
        });
    })
    .catch((err)=>{
        res.status(500).send({
            status: "error",
            message: "Todo deletion failed",
            error: err.message,
        });
    });
}       


module.exports = { getTodoList, createTodo, updateTodo, deleteTodo   };
