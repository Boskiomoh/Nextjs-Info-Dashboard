import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api-urls';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '3';

  // --- DEBUG START ---
  console.log('[/api/news] Route called.');
  // --- DEBUG END ---
  
  /**
   * BEFORE: Hardcoded logic or separate service dependency
   * import { fetchDevToArticles } from '@/lib/news-service';
   * const data = await fetchDevToArticles(page, perPage);
   */
  const apiUrl = API_CONFIG.getDevToUrl();

  // --- DEBUG START ---
  console.log('[/api/news] External API URL resolved to:', apiUrl);
  // --- DEBUG END ---

  try {
    const res = await fetch(`${apiUrl}?per_page=${perPage}&page=${page}`);
    if (!res.ok) throw new Error('External API failed');
    const data = await res.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('News Proxy Error:', error);
    return NextResponse.json({ error: 'Data Fetch Failed' }, { status: 500 });
  }
}
