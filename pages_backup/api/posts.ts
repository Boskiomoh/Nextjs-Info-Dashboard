import { NextApiRequest, NextApiResponse } from 'next';
import posts from '@/data/posts.json';

/**
 * LAYMAN EXPLANATION:
 * This API route returns our entire list of posts.
 * It's essentially a Backend for our frontend!
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(posts);
}
