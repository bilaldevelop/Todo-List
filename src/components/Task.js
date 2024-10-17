import React from 'react';

const Task = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <li className={`flex items-center justify-between p-4 border ${task.completed ? 'bg-green-100' : ''}`}>
      <div>
        <p className="text-lg font-semibold">{task.text}</p>
        <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
        <p className="text-sm text-gray-600">Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
      </div>
      <div>
        <button onClick={onToggle} className="mr-2 text-green-500">
          {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button onClick={onEdit} className="mr-2 text-blue-500">Edit</button>
        <button onClick={onDelete} className="text-red-500">Delete</button>
      </div>
    </li>
  );
};

export default Task;
