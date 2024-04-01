import React from 'react';
import LoginForm from '@/components/auth/LoginPage';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex mb-6 justify-center items-center w-30 h-auto">
                  <Link href={"/"} className='mx-auto'>
                      <Image src="/logo.png" width={140} height={40} priority={true} alt="Kizunice App Logo"/>
                  
                  </Link>
              </div>
                <LoginForm />
            </div>
          </div>
        </div>
      </section>
    );
  }
  
