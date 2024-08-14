import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/lib/providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Login to Kizunice Academy',
  description: 'Lembaga Pelatihan Kerja ke Luar Negeri',
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster/>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
