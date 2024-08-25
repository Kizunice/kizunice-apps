'use client'
import { useEffect,useState } from 'react';
import { Montserrat } from 'next/font/google';
import '@/styles/globals.css';
import Head from './head';
import { Providers } from '@/lib/providers';
import RootLoading from './loading';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

const montserrat = Montserrat({ 
  weight: ['100','200','300','400','500','600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'] 
});

export default function RootLayout({ children }) {
  const [loading,setLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

 return (
    <html lang="en">
      <Head/>
      <body className={montserrat.className}>
        {loading ? <RootLoading/> : (
          <Providers>
            <Header/>
            {children}
            <Footer/>
          </Providers>
        )}
      </body>
    </html>
  )
}
