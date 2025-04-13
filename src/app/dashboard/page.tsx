'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

type URLData = {
  id: number;
  originalURL: string;
  shortURL: string;
  visitCount: number;
  createdAt: string;
};

export default function DashboardPage() {
  const [urls, setUrls] = useState<URLData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');  

   
    if (!token) {
      redirect('/signin'); 
      return;
    }

    setIsAuthenticated(true);

    // Fetch URLs for the authenticated user
    const fetchURLs = async () => {
      try {
        const res = await fetch('/api/urls', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.log(res);
          // redirect('/signin');
          return;
        }

        const data = await res.json();
        setUrls(data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
        redirect('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchURLs();
  }, []);


  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Dashboard</h1>
      <h1> Total Views : </h1>
      <div className="grid grid-cols-1 gap-4">
        {urls.map((url) => (
          <div
            key={url.id}
            className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
          >
            <p className="text-gray-800 font-semibold">
              Original: <a className="text-blue-500" href={url.originalURL} target="_blank" rel="noopener noreferrer">{url.originalURL}</a>
            </p>
            <p className="text-gray-700">
              Shortened: <a className="text-indigo-500" href={`/${url.shortURL}`} target="_blank" rel="noopener noreferrer">{url.shortURL}</a>
            </p>
            <p className="text-sm text-gray-500">Visits: <span className="font-bold">{url.visitCount}</span></p>
            <p className="text-sm text-gray-400">Created at: {new Date(url.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
