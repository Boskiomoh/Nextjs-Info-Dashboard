import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import users from '@/data/users.json';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is missing');
}

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Validate that the username is an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(username)) {
    return NextResponse.json({ message: 'Username must be a valid email address' }, { status: 400 });
  }

  // Find user in our mock JSON database
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  }

  // Generate a secure JWT
  const token = jwt.sign(
    { 
      username: user.username, 
      name: user.name,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Determine if request is secure (HTTPS)
  const requestUrl = new URL(request.url);
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const isSecureConnection = forwardedProto === 'https' || requestUrl.protocol === 'https:';

  // Set the cookie using the cookies() API
  const cookieStore = await cookies();
  cookieStore.set('study_auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' && isSecureConnection,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return NextResponse.json({ user: { username } });
}
