import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIE_NAME, USERS } from '@/constants/auth.constants';
import { signToken } from '@/lib/common/token';

export async function POST(request: Request) {
  let email = '';
  let password = '';

  try {
    const body = (await request.json()) as { email?: string; password?: string };
    email = (body.email ?? '').trim().toLowerCase();
    password = body.password ?? '';
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const user = USERS.find((u) => u.email.toLowerCase() === email && u.password === password);
  if (!user) {
    return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
  }

  const token = await signToken(user.email);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ ok: true });
}
