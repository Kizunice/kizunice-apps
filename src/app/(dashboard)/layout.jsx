import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Head from './head';
import { Providers } from '@/lib/providers';
import DefaultLayout from '@/components/layout/DefaultLayout';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
