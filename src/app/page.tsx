'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQRCode } from 'next-qrcode';

export default function Home() {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [qrCode, setQrCode] = useState('');
  const { Image } = useQRCode();
  const [fullShortURL, setFullShortURL] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>(''); 


  const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;

    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); 
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime; 
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token || !isTokenValid(token)) {
      setIsLoggedIn(false);
      localStorage.removeItem('token'); 
      return;
    }

   
    const decoded = JSON.parse(atob(token.split('.')[1]));
    setUsername(decoded.username); 
    setIsLoggedIn(true);
  }, []); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('Please log in first to shorten URLs.');
      return;
    }

    const token = localStorage.getItem('token');
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Send token for user identification
      },
      body: JSON.stringify({ originalURL: longURL }),
    });

    const data = await res.json();

    if (res.ok) {
      setShortURL(data.shortURL);
      setFullShortURL(data.fullShortURL);
      setQrCode(data.qrCode);
    } else {
      alert('Failed to shorten URL.');
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-teal-500">URL Shortener</h1>
      {isLoggedIn && username && (
        <p className="text-gray-500 mt-2">Welcome, {username}!</p>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <Input
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          placeholder="Enter your long URL"
          className="w-full max-w-md mx-auto p-2 border rounded-md"
        />
        <Button
          type="submit"
          className={`mt-4 ${!isLoggedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500'}`}
          disabled={!isLoggedIn}
        >
          Shorten URL
        </Button>
      </form>

      {!isLoggedIn && (
        <p className="text-gray-500 mt-2">Please log in first to shorten URLs.</p>
      )}

      {shortURL && (
        <div className="mt-6">
          <p className="font-semibold">Shortened URL:</p>
          <a href={fullShortURL} className="text-blue-500" target="_blank" rel="noopener noreferrer">
            {fullShortURL}
          </a>
        </div>
      )}

      {qrCode && (
        <div className="flex justify-center mt-6">
          <div className="mx-auto">
            <Image
              text={longURL}
              options={{
                type: 'image/jpeg',
                quality: 0.3,
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: '#010599FF',
                  light: '#FFBF60FF',
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
