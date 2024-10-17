import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Use useNavigate to handle navigation

  const handleLogin = () => {
    localStorage.setItem('username', username);
    navigate('/home'); // Navigate to home page on login
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border border-gray-300 p-2 rounded-md mb-4 w-full"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Login
      </button>
    </div>
  );
};

export default Login;
