import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * SECURITY EXPLANATION:
 * This Middleware runs before every request.
 * It is the most secure place to handle redirects because it 
 * operates at the "Gateway" level. 
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Get the auth token from cookies
  const token = request.cookies.get('study_auth_token');

  // 2. Define our Public vs Protected rules
  const isLoginPage = pathname === '/login';
  const isPublicApi = pathname.startsWith('/api/auth');
  const isStaticAsset = pathname.startsWith('/_next') || pathname.includes('.');

  // Rule A: If logged in and trying to access Login page -> Go to Dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Rule B: If NOT logged in and trying to access protected content -> Go to Login
  // We ignore static assets and public Auth APIs so the app can function
  if (!token && !isLoginPage && !isPublicApi && !isStaticAsset) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Optimization: Tell Next.js to only run this on specific routes if desired
// Here we run it on everything to stay safe by default (Zero Trust)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
