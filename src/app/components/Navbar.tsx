'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    setUsername(storedUsername);
    setUserId(storedUserId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setUsername(null);
    setUserId(null);
    router.push('/signin'); // or '/' if you prefer home after logout
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-gray-800">
        URLShortify
      </Link>
      <div className="space-x-4 flex items-center">
        {userId && username ? (
          <>
            <span className="text-gray-800">Hi User</span>
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
