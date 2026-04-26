import { NextResponse } from 'next/server';

/**
 * LAYMAN EXPLANATION:
 * This is an App Router Route Handler.
 * It replaces the old pages/api routes.
 * We export a named function (GET, POST, etc.) for the HTTP method we want to handle.
 */
export async function GET() {
  return NextResponse.json({ 
    message: 'Hello from the Next.js API!',
    note: 'I am running on the server.',
    timestamp: new Date().toISOString()
  });
}
