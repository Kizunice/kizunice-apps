'use clent'
import Link from "next/link"


export default function Hero() {
    return (
        // <section className="warpper bg-[url('/hero-banner.png')] bg-cover bg-opacity-50" id="beranda" >
        <section className="warpper" id="beranda" >
            <div className="flex flex-col bg-white/75 h-[90vh] justify-center items-center">
                <div className="px-4 text-center mt-[-4em] md:mt-[-2em]">
                    <h1 className="text-kinPrimary font-semibold my-6 w-full leading-snug !text-4xl lg:max-w-4xl lg:!text-7xl">
                        Mulai karir barumu di Jepang bersama Kizuna
                    </h1>
                    <p className="mx-auto my-6 w-full text-grey lg:max-w-3xl">
                        "Dengan Kizuna, bukan hanya sekadar bekerja di Jepang, 
                        tetapi membuka jalan bagi karier yang gemilang. Temukan pelatihan terbaik, 
                        koneksi yang luas, dan dukungan penuh untuk mewujudkan impian karier Anda di negeri Matahari Terbit."
                    </p>
                </div>
            </div>
        </section>
    )
}