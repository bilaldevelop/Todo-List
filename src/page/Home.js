import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import Task from '../components/Task';
import { getTasks, saveTasks } from '../utils/storage'; // Mock storage utilities

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks);
  }, []);

  const handleAddOrUpdateTask = (task) => {
    if (editingTask) {
      const updatedTasks = tasks.map(t => (t.id === editingTask.id ? { ...t, ...task, completed: false } : t));
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      const newTask = { id: Date.now(), ...task, completed: false };
      setTasks([...tasks, newTask]);
    }
    // Save updated tasks to local storage
    saveTasks([...tasks, task]); // If updating, replace with updatedTasks array
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Handle search and clear input
  const handleSearch = (e) => {
    e.preventDefault();
    // Clear input after search
    setSearchTerm('');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all' filter
  }).filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search Tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-md mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Search
        </button>
      </form>
      <div className="mb-4">
        <label className="mr-2">Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-gray-300 p-2 rounded-md">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <TaskForm onSubmit={handleAddOrUpdateTask} task={editingTask} />
      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onEdit={() => handleEditTask(task)}
            onDelete={() => handleDeleteTask(task.id)}
            onToggle={() => handleToggleComplete(task.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
