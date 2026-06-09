import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/constants/auth.constants';

export async function POST(request: Request) {
  // Redirect to /login and clear the session cookie in one response.
  const response = NextResponse.redirect(new URL('/login', request.url), { status: 303 });
  response.cookies.set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
  return response;
}
