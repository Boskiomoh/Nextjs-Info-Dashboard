import { NextResponse } from 'next/server';
import postsData from '@/data/posts.json';
import { PostsData } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const posts = postsData as PostsData;
  const post = id ? posts[id] : null;

  if (post) {
    return NextResponse.json(post);
  } else {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
}
