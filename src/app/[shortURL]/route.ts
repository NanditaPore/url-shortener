import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { shortURL: string } }
) {
  try {
    const { shortURL } = params;

    const urlRecord = await prisma.shortenedURL.findUnique({
      where: { shortURL },
    });

    if (!urlRecord) {
      return NextResponse.redirect(new URL('/', req.url)); // redirect to homepage if not found
    }

    return NextResponse.redirect(urlRecord.originalURL);
  } catch (error) {
    console.error('Error during redirection:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}
