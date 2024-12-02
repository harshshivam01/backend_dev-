import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const TodoForm = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 px-4 py-3 text-base bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400 transition-all"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center"
        type="submit"
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default TodoForm;
