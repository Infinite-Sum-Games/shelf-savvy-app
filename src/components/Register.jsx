import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_REGISTER_URL } from '../constants';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setuserName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(USER_REGISTER_URL);
    try {
      const response = await fetch(USER_REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Get error details if provided
        throw new Error(errorData.message || 'Registration failed');
      }
  
      const data = await response.json(); // Parse the response JSON
      console.log(data)
      if (data.tempToken && data.username && data.email) {
        localStorage.setItem('tempToken', data.tempToken);
        localStorage.setItem('UserName', data.username);
        localStorage.setItem('Email', data.email); // Store the token in localStorage
      }
  
      navigate('/otp'); 
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };
  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Register</h2>
        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
        )}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Username
            </label>
            <input
              type="text"
              id="userName"
              value={username}
              onChange={(e) => setuserName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
