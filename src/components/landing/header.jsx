'use client'
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Logo from '../../../public/logo-kizunice.png'

export default function Header() {
  const [nav, setNav] = useState(false);


  return (
      <nav className="navbar sticky bg-white px-4 h-[80px] lg:px-20 3xl:px-0 z-30">
        <div className="navbar-start">
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
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-kinPrimary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-4 gap-4 shadow bg-white rounded-box w-[350px] z-[30]">
              <li><Link href="/" scroll={true}>Beranda</Link></li>
              <li><Link href="/#tentang" scroll={true}>Tentang Kizuna</Link></li>
              <li><Link href="/#program"scroll={true}>Program</Link></li>
              <li><Link href="/#kontak"scroll={true}>Kontak Kami</Link></li>
              <li><Link href="/login" passHref={true} className="btn px-4 py-0.5">Masuk</Link></li>
              <li><Link href="/register" passHref={true} className="btn bg-secondary text-white px-4 py-0.5">Daftar</Link></li>
            </ul>
          </div>
          <div className="hidden lg:flex lg:items-center">
            <Link href="/login" passHref={true} className="px-4 py-0.5">
              Masuk
            </Link>
            <Link href="/register" passHref={true} className="bg-secondary rounded-lg text-white px-6 py-1">
              Daftar
            </Link>
          </div>
        </div>
    </nav>
  )
}