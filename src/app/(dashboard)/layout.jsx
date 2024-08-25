import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Head from './head';
import { Providers } from '@/lib/providers';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <Head />
      <body className={inter.className}>
        <Toaster/>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
