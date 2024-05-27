import Link from "next/link"
import Image from "next/image"
import Logo from '../../../public/logo-kizunice.png'

export default function Header() {
    return (
        <nav className="navbar sticky bg-white px-4 lg:px-20 3xl:px-0 z-30">
        <div className="navbar-start">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52 z-[30]">
                <li><Link href="/">Beranda</Link></li>
                <li><Link href="/#tentang">Tentang Kizuna</Link></li>
                <li><Link href="/#program">Program</Link></li>
                <li><Link href="/#kontak">Kontak Kami</Link></li>
                </ul>
            </div>
            <Link href="/" className='flex justify-center items-center font-bold text-xl tracking-[-6px] text-white tracking-tighter'>
                <Image src={Logo} width={150} height={100} alt="Logo LPK Kizuna Indonesia Nippon" />
            </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 scroll-smooth">
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/#tentang">Tentang Kizuna</Link></li>
            <li><Link href="/#program">Program</Link></li>
            <li><Link href="/#kontak">Kontak Kami</Link></li>
          </ul>
        </div>
        <div className="navbar-end gap-4">
          <Link href="/login" passHref={true} className="px-4 py-0.5">
            Masuk
          </Link>
          <Link href="/register" passHref={true} className="btn bg-secondary text-white px-4 py-0.5">
            Daftar
          </Link>
        </div>
      </nav>
    )
}