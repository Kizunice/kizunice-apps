import React, {Suspense} from 'react';
import SendVerification from '@/components/auth/SendVerification';
export default function SendVerificationPage() {
    return (
        <section className="bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-secondary rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <SendVerification />
                </div>
            </div>
            </div>
        </section>
    );
  }
  
