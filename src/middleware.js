import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (
    session &&
    (path === '/login' || path === '/register' || path === '/forgot-password')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    '/((?!api|_next/static|_next/image|favicon.ico|login|register|forgot-password).*)',
  ],
};
