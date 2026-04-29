import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '3';
  
  const baseUrl = process.env.DEVTO_API_URL || 'https://dev.to/api/articles';
  
  try {
    const res = await fetch(`${baseUrl}?per_page=${perPage}&page=${page}&top=7`, {
      next: { revalidate: 600 }
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch news' }, { status: res.status });
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('News proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
