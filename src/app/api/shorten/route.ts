import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';

export async function POST(req: Request) {
  try {
    const { originalURL } = await req.json();

    if (!originalURL || !originalURL.startsWith('http')) {
      return NextResponse.json(
        { message: 'Invalid URL provided.' },
        { status: 400 }
      );
    }

    const shortURL = nanoid(8);

    const shortenedURL = await prisma.shortenedURL.create({
      data: {
        originalURL,
        shortURL,
      },
    });

    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || 'http://localhost:3000';

    const fullShortURL = `${baseURL}/${shortURL}`;

    const qrCode = await QRCode.toDataURL(fullShortURL);

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
