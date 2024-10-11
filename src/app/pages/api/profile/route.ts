import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    return res.status(200).json({ username: decoded.username });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}