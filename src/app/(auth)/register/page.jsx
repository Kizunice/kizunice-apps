import RegisterForm from '@/components/auth/RegisterPage';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex mb-6 justify-center items-center">
                <Link href={"/"} className='mx-auto'>
                    <Image src="/logo.png" width={140} height={40} alt="Kizunice App Logo"/>
                
                </Link>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
