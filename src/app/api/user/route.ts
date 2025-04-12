// pages/api/user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Get JWT token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; username: string };

    // Fetch user from DB using decoded userId
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { username: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return username
    return res.status(200).json({ username: user.username });
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
