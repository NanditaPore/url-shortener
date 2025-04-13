'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


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
    console.log(token,"Navbar");
    
    
    if (!token && !isTokenValid(token)) {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      setUsername(null);
      setLoading(false);
      router.push('/signin'); 
      return;
    }
  

    setLoading(false); 
    const decoded = JSON.parse(atob(token.split('.')[1]));
    setUsername(decoded.username); 
    setIsLoggedIn(true);
  }, [router]);

  const handleLogout = () => {
    
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername(null);
    router.push('/signin'); 
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          URLShortify
        </Link>
        <div className="space-x-4 flex items-center">
          {/* Placeholder while loading */}
          <span className="text-gray-800">Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-gray-800">
        URLShortify
      </Link>
      <div className="space-x-4 flex items-center">
        {isLoggedIn && username ? (
          
          <>
            <span className="text-gray-800">Hi, {username}</span>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </>
        ) : (

          <>
            <Link href="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
