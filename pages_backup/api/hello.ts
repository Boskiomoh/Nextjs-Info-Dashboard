import { NextApiRequest, NextApiResponse } from 'next';

/**
 * LAYMAN EXPLANATION:
 * This is a Backend Route. 
 * When you visit /api/hello, this function runs on the server.
 * It sends back a JSON response. 
 * It's just like a mini database or service!
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ 
    message: 'Hello from the Next.js API!',
    note: 'I am running on the server.',
    timestamp: new Date().toISOString()
  });
}
