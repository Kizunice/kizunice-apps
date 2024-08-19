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

  const Redirect = () => {
   if (session.role !== "FINANCE" && financeRoutes.includes(path)) {
      const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    } else if (session.role !== "ADMIN" && adminRoutes.includes(path)) {
      const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  if(session) {
    return Redirect()
  }

  if (!session && protectedRoutes.includes(path)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } 

  return NextResponse.next();


  // if (!session && protectedRoutes.includes(path)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // } 
  // return NextResponse.redirect(new URL('/dashboard', request.url));

  // if (!session && protectedRoutes.includes(path)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // } else if (session && path === '/login') {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|login).*)'
  ],
}