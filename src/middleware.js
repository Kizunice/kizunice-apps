import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const protectedRoutes = ["/dashboard", "/attendance", "/learning", "/jobs", "/jobs-application", "/document", "/data-student", "/data-partner","/data-sensei","/data-staff","/finance" ]

  // if (!session && protectedRoutes.includes(path)) {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // } else if (session && protectedRoutes.includes(path)) {
  //   return NextResponse.next()
  //   // return NextResponse.redirect(new URL('/dashboard', req.url))
  // }
 
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)'
  ],
}
