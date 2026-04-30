import { NextResponse } from 'next/server';


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const baseUrl = process.env.DEVTO_API_URL;

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
