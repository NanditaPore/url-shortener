'use client';

import { useState } from 'react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert('Login successful!');
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('userId', data.userId);
      window.location.href = '/';
      // Optionally store JWT/token here
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Sign In</h1>
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
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  );
}
