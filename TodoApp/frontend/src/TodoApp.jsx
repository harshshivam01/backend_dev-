import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { todoService } from './services/todoService';
import './TodoApp.css';
import { useAuth } from './context/AuthContext';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      loadTodos();
    } else {
      setTasks([]); // Clear tasks when logged out
    }
  }, [isLoggedIn]);

  const loadTodos = async () => {
    try {
      const todos = await todoService.getAllTodos();
      const sortedTodos = sortTodosByCompletion(todos);
      setTasks(sortedTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const sortTodosByCompletion = (todos) => {
    return [...todos].sort((a, b) => {
      if (a.completed === b.completed) {
        // If completion status is the same, sort by creation date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      // Sort incomplete tasks first
      return a.completed ? 1 : -1;
    });
  };

  const addTask = async (text) => {
    try {
      const newTodo = {
        title: text,
        description: ''
      };
      const response = await todoService.createTodo(newTodo);
      const updatedTasks = sortTodosByCompletion([...tasks, response.data]);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = tasks.find(task => task._id === id);
      const updatedTodo = {
        ...todo,
        completed: !todo.completed
      };
      const response = await todoService.updateTodo(updatedTodo);
      const updatedTasks = sortTodosByCompletion(
        tasks.map(task => task._id === id ? response.data : task)
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const removeTask = async (id) => {
    try {
      await todoService.deleteTodo(id);
      const updatedTasks = sortTodosByCompletion(
        tasks.filter(task => task._id !== id)
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await todoService.updateTodo(updatedTask);
      const updatedTasks = sortTodosByCompletion(
        tasks.map(task => task._id === id ? response.data : task)
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 mt-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-white mb-4">Todo List</h1>
        <TodoForm addTask={addTask} />
      </div>
      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TodoItem
              key={task._id}
              task={task}
              toggleComplete={toggleComplete}
              removeTask={removeTask}
              updateTask={updateTask}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 italic mt-8">
            No tasks yet. Add a new task to get started!
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
