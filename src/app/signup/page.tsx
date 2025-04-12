'use client';

import { useState } from 'react';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Signup successful!');
      // Optionally redirect to login
    } else {
      alert(data.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            id="username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Sign Up
        </button>
      </form>
    </div>
  );
}
