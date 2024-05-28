'use client'
import Link from "next/link"

export default function Hero() {
    return (
        <section className="warpper bg-[url('/bg-pattern.jpg')] bg-cover bg-opacity-15" id="beranda" >
            <div className="flex flex-col bg-white/95 h-[90vh] justify-center items-center">
                <div className="px-8 text-center mt-[-4em] md:mt-[-2em]">
                    <h1 className="text-kinPrimary font-semibold my-6 w-full leading-snug !text-4xl lg:max-w-4xl lg:!text-7xl">
                        Mulai karir barumu di Jepang bersama Kizuna
                    </h1>
                    <p className="mx-auto my-6 w-full text-grey lg:max-w-3xl">
                        "Dengan Kizuna, bukan hanya sekadar bekerja di Jepang, 
                        tetapi membuka jalan bagi karier yang gemilang. Temukan pelatihan terbaik, 
                        koneksi yang luas, dan dukungan penuh untuk mewujudkan impian karier Anda di negeri Matahari Terbit."
                    </p>
                    <button className="relative rounded-xl px-6 py-2 overflow-hidden border border-kinPrimary text-kinPrimary transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-kinPrimary before:duration-300 before:ease-out hover:text-white hover:shadow-kinPrimary hover:before:h-40 hover:before:w-40 hover:before:opacity-80"> 
                        <Link 
                            href="/" 
                            class="relative z-10"
                            onClick={(e) => {
                                setTimeout(() => {
                                document.getElementById("tentang") &&
                                    document
                                    .getElementById("tentang")
                                    .scrollIntoView({ behavior: "smooth"});
                                }, 500)
                                }} 
                        >
                            selengkapnya
                        </Link>
                    </button>
                </div>
            </div>
        </section>
    )
}