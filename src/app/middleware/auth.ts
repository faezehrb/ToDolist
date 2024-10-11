import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const SECRET_KEY = 'your_secret_key'; // Same secret key as used in login API

export function verifyToken(req: NextApiRequest) {
  const token = req.cookies.token;
  if (!token) {
    throw new Error('Authentication required');
  }

  return jwt.verify(token, SECRET_KEY);
}