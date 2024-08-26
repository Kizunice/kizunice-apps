'use client'
import Link from "next/link"
import Image from "next/image"
import React from "react"
import {
    RiFacebookCircleFill,
    RiYoutubeFill,
    RiTiktokFill,
    RiMapPinLine,
    RiMessage2Line,
    RiPhoneLine,
    RiInstagramFill
} from "react-icons/ri"
import Logo from '../../../public/Logo_ina.png'

export default function Footer() {
    return (
        <footer className="bg-secondary" id="kontak">
            <div className="max-w-[78rem] mx-auto px-8 py-12 lg:pt-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    <div>
                        <div className="flex justify-start text-left ">
                            <Link href={"/"} className="bg-white px-4 py-2 rounded-sm">
                                <Image src={Logo} width={140}  height={100} alt="Logo INA" />
                            </Link>
                        </div>

                        <p className="mt-6 max-w-md text-left leading-relaxed text-gray-100 text-[13px] sm:max-w-xs ">
                        Lembaga pelatihan kerja yang telah memiliki izin sending organization (SO) khusus untuk pemberangkatan tenaga kerja, pemagang dan study ke Jepang. 🇮🇩🇯🇵
                        </p>

                        <ul className="mt-4 md:mt-6 flex justify-start gap-4 md:gap-6">
                            <li>
                                <Link href="https://www.facebook.com/profile.php?id=100090210174530&mibextid=ZbWKwL">
                                    <RiFacebookCircleFill
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.youtube.com/channel/UClXAuxKJq7L8z5X11bpSQLA">
                                    <RiYoutubeFill
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.instagram.com/lpkindonesianippon/">
                                    <RiInstagramFill
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.tiktok.com/@indonesianippon">
                                    <RiTiktokFill
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1">
                        <div className="text-left">
                            <p className="text-lg font-medium text-white">Menu</p>

                            <ul className="mt-4 md:mt-8 space-y-4 text-sm">
                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/#tentang">
                                        Tentang INA
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/#program">
                                        Program Kami
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/#facility">
                                        Fasilitas LPK
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/">
                                        Link Pendaftaran
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/">
                                        Link Pendaftaran Sensei
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-left">
                            <p className="text-lg font-medium text-white">Kontak Kami</p>

                            <ul className="mt-4 md:mt-8 space-y-4 text-sm">
                                <li>
                                    <Link
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="/"
                                    >
                                        <RiMessage2Line fontSize={18} className="text-gray-100" />

                                        <span className="flex-1 text-gray-100">info.lpkinna@gmail.com</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="/"
                                    >
                                        <RiPhoneLine fontSize={18} className="text-gray-100" />
                                        <span className="flex-1 text-gray-100">08111184798</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="/"
                                    >
                                        <RiPhoneLine fontSize={18} className="text-gray-100" />
                                        <span className="flex-1 text-gray-100">08111290562</span>
                                    </Link>
                                </li>

                                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                                    <RiMapPinLine fontSize={18} className="text-gray-100"/>

                                    <address className="-mt-0.5 flex-1 not-italic text-gray-100">
                                        LPK INA SO Kantor Pusat
                                        Purwadadi Tim., Kec. Purwadadi, Kabupaten Subang,
                                        Jawa Barat 46385
                                    </address>
                                </li>
                            </ul>
                        </div>
                </div>

                <div className="mt-10 border-t border-gray-300 pt-6">
                    <div className="text-center ">
                        <p className="mt-2 text-sm text-gray-200 sm:order-first sm:mt-0">Copyright &copy; 2024 ina-app.com</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}