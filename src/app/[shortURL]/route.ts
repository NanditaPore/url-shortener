import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { shortURL: string } }
) {
  const { shortURL } = params;

  try {
    const record = await prisma.shortenedURL.update({
      where: { shortURL },
      data: { visitCount: { increment: 1 } },
    });

    if (!record) {
      return NextResponse.json({ error: 'Short URL not found' }, { status: 404 });
    }

    return NextResponse.redirect(record.originalURL);
  } catch (error) {
    console.error('Redirection error:', error);
    return NextResponse.json({ error: 'Failed to redirect' }, { status: 500 });
  }
}
