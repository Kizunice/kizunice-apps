import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import DefaultLayout from '@/components/layout/DefaultLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kizunice Academy',
  description: 'Lembaga Pelatihan Kerja ke Luar Negeri',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
