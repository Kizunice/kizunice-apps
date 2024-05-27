import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const protectedRoutes = ["/dashboard", "/attendance", "/learning", "/jobs", "/document", "/finance", "/data-student", "/data-partner","/data-sensei", ]


  if (!session && protectedRoutes.includes(path)) {
    const absoluteURL = new URL("/login", request.url);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (!protectedRoutes.includes(path) && session) {
    const relativeURL = new URL("/dashboard", request.url);
    return NextResponse.redirect(relativeURL.toString());
  }
  return NextResponse.next();

  // if (!session && 
  //   path === '/dashboard' || 
  //   path === '/attendance' || 
  //   path === '/learning' || 
  //   path === '/jobs' || 
  //   path === '/data-student' || 
  //   path === '/data-sensei'|| 
  //   path === '/data-partner' || 
  //   path === '/document' || 
  //   path === '/finance'
  // ) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // } else if (session && path === '/login') {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    '/((?!api|_next/static|_next/image|favicon.ico|login|register|forgot-password).*)',
  ],
}