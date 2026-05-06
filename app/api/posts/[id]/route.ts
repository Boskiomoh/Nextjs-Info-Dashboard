import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api-urls';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  /**
   * BEFORE: Directly accessing ENV variables (Fragile & manually switched)
   * const baseUrl = process.env.DEVTO_API_URL;
   */
  const baseUrl = API_CONFIG.getDevToUrl();

  try {
    const res = await fetch(`${baseUrl}/${id}`);
    
    if (!res.ok) {
      return NextResponse.json({ error: 'Post not found' }, { status: res.status });
    }
    
    const post = await res.json();
    return NextResponse.json(post);
  } catch (error) {
    console.error('API Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
