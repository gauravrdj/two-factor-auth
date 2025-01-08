import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'sonner'
const LoginLogout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
    // Simulate successful login
    setIsLoggedIn(true);
    toast.success('Welcome 🎉')
    // console.log('Successfully logged in');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/');
    // Simulate logout
    setIsLoggedIn(false);
    toast.success('👋 See you soon...')
    // console.log('Successfully logged out');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {isLoggedIn
            ? 'Congratulations🎉 on successfully completing the two-factor authentication!'
            : 'Please Log In'}
        </h1>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginLogout;
