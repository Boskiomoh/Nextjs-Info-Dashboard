import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

/**
 * SECURE PATTERN:
 * This runs ONLY on the server.
 * It sets a cookie that JavaScript cannot read (httpOnly: true).
 */
import users from '@/data/users.json';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Find user in our mock JSON database
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate a secure JWT
  const token = jwt.sign(
    { 
      username: user.username, 
      name: user.name,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Set the cookie
  const cookie = serialize('study_auth_token', token, {
    httpOnly: true,  // CRITICAL: Prevent JS access (XSS Protection)
    secure: process.env.NODE_SET_SECURE === 'true' || process.env.NODE_ENV === 'production', 
    sameSite: 'lax', // CSRF Protection
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ user: { username } });
}
