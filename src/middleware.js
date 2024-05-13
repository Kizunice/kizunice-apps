import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    '/((?!api|_next/static|_next/image|favicon.ico|login|register|forgot-password).*)',
  ],
};

// import { getToken } from 'next-auth/jwt';
// import { withAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';

// export default async function middleware(req, event) {
//   const token = await getToken({ req });
//   const isAuthenticated = !!token;

//   //   if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
//   //     return NextResponse.redirect(new URL('/', req.url));
//   //   }

//   if (
//     (req.nextUrl.pathname.startsWith('/login') ||
//       req.nextUrl.pathname.startsWith('/register') ||
//       req.nextUrl.pathname.startsWith('/forgot-password')) &&
//     isAuthenticated
//   ) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   const authMiddleware = await withAuth({
//     pages: {
//       signIn: `/login`,
//     },
//   });

//   // @ts-expect-error
//   return authMiddleware(req, event);
// }
