import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Redirect to login if no token is found
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify JWT token
    jwt.verify(token, secret);
    return NextResponse.next();
  } catch (error) {
    // Redirect if token is invalid
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Specify protected routes here
export const config = {
  matcher: ['/dashboard', '/profile'], // Protect these routes
};