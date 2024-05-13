import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  // const session = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  // if (session) return NextResponse.redirect(new URL('/', request.url));

  // if (!session) return NextResponse.redirect(new URL('/login', request.url));

  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  const currentUser = request.cookies.get('next-auth.session-token')?.value;
  console.log(currentUser); // => { name: 'nextjs', value: 'fast', Path: '/' }

  if (!currentUser) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    '/((?!api|_next/static|_next/image|favicon.ico|login|register|forgot-password).*)',
  ],
};
