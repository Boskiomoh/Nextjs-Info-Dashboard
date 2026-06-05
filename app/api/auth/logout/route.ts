import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const isSecureConnection = forwardedProto === 'https' || requestUrl.protocol === 'https:';

  const cookieStore = await cookies();
  
  // Clear the cookie
  cookieStore.set('study_auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' && isSecureConnection,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  return NextResponse.json({ message: 'Logged out successfully' });
}
