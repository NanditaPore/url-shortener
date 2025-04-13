import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decodeToken } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = decodeToken(token); 

    const urls = await prisma.shortenedURL.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(urls);
  } catch (error) {
    console.error('Failed to fetch URLs:', error);
    return NextResponse.json({ error: 'Failed to load URLs' }, { status: 500 });
  }
}
