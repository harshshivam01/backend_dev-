import React, { useState } from 'react';
import { FaTrash, FaCheckCircle, FaEdit, FaSave } from 'react-icons/fa';

const TodoItem = ({ task, toggleComplete, removeTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSubmit = () => {
    if (editedTitle.trim()) {
      updateTask(task._id, { ...task, title: editedTitle });
      setIsEditing(false);
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 bg-gray-700 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg ${task.completed ? 'opacity-70 bg-gray-800' : ''}`}>
      <div className="flex items-center gap-3 flex-1">
        <FaCheckCircle
          className={`text-xl cursor-pointer transition-colors ${task.completed ? 'text-green-500' : 'text-gray-400 hover:text-green-500'}`}
          onClick={() => toggleComplete(task._id)}
        />
        {isEditing ? (
          <input
            type="text"
            className="flex-1 px-3 py-2 bg-gray-600 rounded border-none focus:ring-2 focus:ring-blue-500 text-white"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
        ) : (
          <span className={`text-white ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {isEditing ? (
          <FaSave
            className="text-green-500 hover:text-green-400 cursor-pointer text-lg transition-all hover:scale-110"
            onClick={handleSubmit}
          />
        ) : (
          <FaEdit
            className="text-blue-500 hover:text-blue-400 cursor-pointer text-lg transition-all hover:scale-110"
            onClick={() => setIsEditing(true)}
          />
        )}
        <FaTrash
          className="text-red-500 hover:text-red-400 cursor-pointer text-lg transition-all hover:scale-110"
          onClick={() => removeTask(task._id)}
        />
      </div>
    </div>
  );
};

export default TodoItem;
