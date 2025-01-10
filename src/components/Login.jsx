import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_LOGIN_URL } from '../constants';
function Login() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
     console.log("username "+username)
     console.log("password",password)
      const response = await fetch(USER_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const token = data.token;
      const email = data.email
      console.log("email fetched:"+email)
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('email',email);
      // Navigate to a protected route (e.g., /profile)
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
  <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl">
    <h2 className="text-4xl font-bold text-white text-center mb-8 tracking-wide">
      Welcome Back
    </h2>
    {error && (
      <div className="mb-4 text-sm text-red-500 text-center font-medium">
        {error}
      </div>
    )}
    <form onSubmit={handleLogin}>
      {/* Email Field */}
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          UserName
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your Username"
          required
        />
      </div>
      {/* Password Field */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your password"
          required
        />
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md transform hover:scale-105"
      >
        Log In
      </button>
    </form>
    {/* Additional Links */}
    <p className="text-gray-400 text-center mt-6">
      Don't have an account?{' '}
      <a
        href="/register"
        className="text-blue-500 hover:underline font-medium"
      >
        Sign Up
      </a>
    </p>
  </div>
</div>

  );
}

export default Login;
