import Image from 'next/image';
import Link from 'next/link';
import KizuniceLogo from "/public/logo-kizunice-white.png"
import SenseiRegister from '@/components/auth/RegisterSenseiPage';

export default function RegisterSenseiPage() {
  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-secondary rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex mb-6 justify-center items-center w-30 h-auto">
                <Link href={"/"} className='mx-auto'>
                    <Image src={KizuniceLogo} width={180} height={40} priority={false} alt="Kizunice App Logo"/>
                
                </Link>
            </div>
            <SenseiRegister />
          </div>
        </div>
      </div>
    </section>
  );
}
