import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import { decodeToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { originalURL } = await req.json();

    console.log('Request Body:', { originalURL });
    console.log('Authorization Header:', req.headers.get('authorization'));

    if (!originalURL || !originalURL.startsWith('http')) {
      return NextResponse.json(
        { message: 'Invalid URL provided.' },
        { status: 400 }
      );
    }


    const shortURL = nanoid(8);


    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Authorization header missing.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1]; // Extract the token (Bearer <token>)
    if (!token) {
      return NextResponse.json(
        { message: 'Token missing from authorization header.' },
        { status: 401 }
      );
    }

    // Decode the token and extract user ID
    const userId = decodeToken(token);
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized request, invalid or missing token.' },
        { status: 401 }
      );
    }


    const shortenedURL = await prisma.shortenedURL.create({
      data: {
        originalURL,
        shortURL,
        user: {
          connect: { id: userId }
        }
      },
    });

    // Generate the full short URL
    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || 'http://localhost:3000';
    const fullShortURL = `${baseURL}/${shortURL}`;

    // Generate QR code for the shortened URL
    const qrCode = await QRCode.toDataURL(fullShortURL);

    // Return the shortened URL and QR code in the response
    return NextResponse.json({
      shortURL,
      fullShortURL,
      qrCode,
    });
  } catch (error) {
    console.error('Error in URL shortening:', error);
    return NextResponse.json(
      { message: 'Failed to shorten URL' },
      { status: 500 }
    );
  }
}
