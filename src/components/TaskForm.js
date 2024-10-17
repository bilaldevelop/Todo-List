import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, task }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (task) {
      setText(task.text);
      setDueDate(task.dueDate);
      setPriority(task.priority);
    } else {
      setText('');
      setDueDate('');
      setPriority('medium');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return; // Prevent submitting empty tasks
    onSubmit({ text, dueDate, priority });
    // Clear the input fields after submitting
    setText('');
    setDueDate('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your task here"
        className="border border-gray-300 p-2 rounded-md mb-2 w-full"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 p-2 rounded-md mb-2 w-full"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border border-gray-300 p-2 rounded-md mb-2 w-full"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
