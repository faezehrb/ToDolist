import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // Clear the JWT cookie by setting its Max-Age to 0
  res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0;');
  return res.status(200).json({ message: 'Logged out successfully' });
}