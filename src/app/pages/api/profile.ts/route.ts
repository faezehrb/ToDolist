import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../middleware/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const decodedToken = verifyToken(req);
    res.status(200).json({ message: 'Profile data', user: decodedToken });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}