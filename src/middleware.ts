import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_NAME } from '@/constants/auth.constants';
import { verifyToken } from '@/lib/common/token';

/**
 * Route guard:
 * - Unauthenticated request to /dashboard/* -> redirect to /login.
 * - Authenticated request to /login         -> redirect to /dashboard.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const email = await verifyToken(token);
  const isAuthed = Boolean(email);

  const isLogin = pathname === '/login';
  const isProtected = pathname === '/dashboard' || pathname.startsWith('/dashboard/');

  if (isProtected && !isAuthed) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLogin && isAuthed) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/dashboard', '/login'],
};
