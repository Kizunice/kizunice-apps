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
    return NextResponse.redirect(new URL("/login", request.url));
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
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)'
  ],
}