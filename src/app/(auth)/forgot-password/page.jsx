import React from 'react';
import ForgotPassForm from '@/components/auth/ForgotPage';
import Link from 'next/link';
import Image from 'next/image';
import KizuniceLogo from "../../../../public/logo.png"

export default function ForgotPage() {
    return (
      <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-secondary rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex mb-6 justify-center items-center w-30 h-auto">
                  <Link href={"/"} className='mx-auto'>
                      <Image src={KizuniceLogo} width={140} height={40} priority={true} alt="Kizunice App Logo"/>
                  
                  </Link>
              </div>
                <ForgotPassForm />
            </div>
          </div>
        </div>
      </section>
    );
  }
  
