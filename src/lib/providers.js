'use client';
import { SessionProvider } from 'next-auth/react';
// import { getServerSession } from 'next-auth';
// import { authOptions } from './api/auth/[...nextauth]/route';
export function Providers({ children }) {
  // const session = getServerSession(authOptions);
  return <SessionProvider>{children}</SessionProvider>;
}
