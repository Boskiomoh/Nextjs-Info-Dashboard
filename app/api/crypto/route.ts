import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api-urls';

export async function GET() {
  /**
   * BEFORE: Redundant fallback logic repeated in every route
   * const baseUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL || 'https://api.coingecko.com/api/v3/coins/markets';
   */
  const baseUrl = API_CONFIG.getCryptoUrl() || 'https://api.coingecko.com/api/v3/coins/markets';
  
  try {
    const res = await fetch(`${baseUrl}?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true`);
    
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch crypto' }, { status: res.status });
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Crypto proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
