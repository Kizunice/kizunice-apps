'use client'
import Link from "next/link"
import Image from "next/image"
import React from "react"
import {
    RiFacebookCircleFill,
    RiInstagramLine,
    RiLinkedinFill,
    RiMapPinLine,
    RiMessage2Line,
    RiPhoneLine,
    RiTwitterFill,
    RiInstagramFill
} from "react-icons/ri"
import Logo from '../../../public/Logo_ina.png'

export default function Footer() {
    return (
        <footer className="bg-secondary" id="kontak">
            <div className="max-w-[78rem] mx-auto p-8 lg:pt-12">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <div className="flex justify-start text-left ">
                            <Link href={"/"} className="bg-white px-4 py-2 rounded-sm">
                                <Image src={Logo} width={140}  height={100} alt="Logo INA" />
                            </Link>
                        </div>

                        <p className="mt-6 max-w-md text-left leading-relaxed text-gray-100 text-[13px] sm:max-w-xs ">
                        Kizuna Indonesia Nippon adalah lembaga pelatihan yang didedikasikan untuk membantu para pencari kerja mewujudkan impian mereka bekerja di Jepang. 
                        </p>

                        <ul className="mt-4 md:mt-6 flex justify-start gap-4 md:gap-6">
                            <li>
                                <Link href="#">
                                    <RiFacebookCircleFill
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <RiInstagramFill
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <RiLinkedinFill
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <RiTwitterFill
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
                        <div className="text-left">
                            <p className="text-lg font-medium text-white">Menu</p>

                            <ul className="mt-4 md:mt-8 space-y-4 text-sm">
                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/about">
                                        Tentang Kizunice
                                    </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/service">
                                        Program Kami
                                    </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/project">
                                        Cara Pendaftaran
                                    </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/team">
                                        Artikel
                                    </Link>
                                </li>
                            </ul>
                        </div>

                       


                        <div className="text-left col-span-2">
                            <p className="text-lg font-medium text-white">Contact Us</p>

                            <ul className="mt-4 md:mt-8 space-y-4 text-sm">
                                <li>
                                    <Link
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="/"
                                    >
                                        <RiMessage2Line fontSize={18} className="text-gray-100" />

                                        <span className="flex-1 text-gray-100">lpkkizunanippon@gmail.com</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="/"
                                    >
                                        <RiPhoneLine fontSize={18} className="text-gray-100" />

                                        <span className="flex-1 text-gray-100">0813 8430 4152</span>
                                    </Link>
                                </li>

                                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                                    <RiMapPinLine fontSize={18} className="text-gray-100"/>

                                    <address className="-mt-0.5 flex-1 not-italic text-gray-100">
                                    Jl. Gongseng Raya No.2-4, RT.7/RW.10, Cijantung, Kec. Ps. Rebo, Kota Jakarta Timur 13770
                                    </address>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-300 pt-6">
                    <div className="text-center ">
                        <p className="mt-2 text-sm text-gray-200 sm:order-first sm:mt-0">Copyright &copy; 2024 INA-APP.com</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}