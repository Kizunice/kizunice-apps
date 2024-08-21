import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const protectedRoutes = ["/dashboard", "/attendance", "/learning", "/jobs", "/jobs-application", "/document", "/data-student", "/data-partner","/data-sensei", ]
  
  const financeRoutes = ["/finance"]
  const adminRoutes = ["/document","/data-student", "/data-partner","/data-sensei" ]

}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|login).*)'
  ],
}