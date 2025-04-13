import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function decodeToken(token: string): number {
  if (!token) throw new Error('Token missing');

  try {
    const decoded = jwt.verify(token, SECRET) as { userId: number };
    return decoded.userId;
  } catch (err) {
    console.error('JWT Decode Error:', err);
    throw new Error('Invalid or expired token');
  }
}
