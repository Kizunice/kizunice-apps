'use client'
import { stencil } from "@/app/(root)/layout"
import Image from "next/image"
export default function About() {
    return (
        <section className=" py-[4rem] bg-white lg:py-[6rem]" id="tentang" >
            <div className="flex flex-col lg:flex-row lg:max-w-[80rem] mx-auto justify-center items-center">
                <div className="px-8 text-center">
                    <Image src="/about-banner.png" width={400} height={550} alt="Kizunice Academy" className="rounded-l-3xl" />
                </div>
                <div className="px-8 text-left lg:px-12 lg:max-w-3xl">
                    <h1 className={`${stencil.variable} font-style uppercase text-primary font-semibold my-6 w-full leading-snug !text-4xl lg:max-w-4xl lg:!text-6xl`}>
                        <span className="text-secondary">Tentang</span> INA
                    </h1>
                    <p className="mx-auto my-6 w-full text-grey ">
                    <span className="font-bold">LPK PT INDONESIA NIPPON ANUGERAH</span> didirikan pada 28 Oktober 2021, 
                    berfokus pada pemberdayaan generasi muda melalui program pembentukan sikap mental, keterampilan, dan 
                    kemandirian. Program unggulan kami, Diklat Bahasa Jepang Terpadu dan magang ke Jepang, bertujuan mencetak 
                    siswa yang berwawasan luas, bertanggung jawab, dan mandiri dengan disiplin yang kuat. Kami bekerja sama 
                    dengan lembaga terpercaya untuk memastikan peserta mendapatkan keterampilan, pengalaman, dan sikap kerja 
                    positif yang dibutuhkan.
                    <br/>
                    <br/>
                    Dengan tujuan mulia meningkatkan kualitas SDM dan mewujudkan kesejahteraan masyarakat, LPK PT Indonesia 
                    Nippon Anugerah juga bermitra dengan rumah sakit, panti lansia, dan perusahaan konstruksi, di mana siswa 
                    menjalani praktik kerja sesuai bidang magang mereka. 
                    <br/>
                    <br/>
                    LPK PT INDONESIA NIPPON ANUGERAH berpusat di Kota Depok, dan memiliki cabang di
                    <br/>
                    <br/>
                    <span className="font-bold">SUMBAR - CIKARANG - MANADO - CIJANTUNG</span>
                    </p>
                </div>
            </div>
        </section>
    )
}