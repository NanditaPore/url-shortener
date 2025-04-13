'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQRCode } from 'next-qrcode';


export default function Home() {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [qrCode, setQrCode] = useState('');
  const { Image } = useQRCode();
  const [fullShortURL, setFullShortURL] = useState('');
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalURL: longURL }),
    });

    const data = await res.json();

    if (res.ok) {
      setShortURL(data.shortURL);
      setFullShortURL(data.fullShortURL);
      setQrCode(data.qrCode);
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-teal-500">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <Input
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          placeholder="Enter your long URL"
          className="w-full max-w-md mx-auto p-2 border rounded-md"
        />
        <Button type="submit" className="mt-4">Shorten URL</Button>
      </form>

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
