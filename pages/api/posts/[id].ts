import { NextApiRequest, NextApiResponse } from 'next';
import postsData from '@/data/posts.json';
import { PostsData } from '@/types';

/**
 * LAYMAN EXPLANATION:
 * Just like pages, API routes can be dynamic too!
 * /api/posts/hello-world will find just that one post.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const posts = postsData as PostsData;
  const post = id ? posts[id as string] : null;

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
}
