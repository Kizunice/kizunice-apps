'use client'
import Image from "next/image"
export default function About() {
    return (
        <section className="lg:max-w-[80rem] mx-auto py-[4rem] lg:py-[6rem]" id="tentang" >
            <div className="flex flex-col lg:flex-row justify-center items-center">
                <div className="px-8 text-center">
                    <Image src="/about-banner.png" width={400} height={550} alt="Kizunice Academy" className="rounded-l-3xl" />
                </div>
                <div className="px-8 text-left lg:px-12 lg:max-w-3xl lg:mt-[-4em] md:mt-[-2em]">
                    <h1 className="text-primary font-semibold my-6 w-full leading-snug !text-4xl lg:max-w-4xl lg:!text-7xl">
                        <span className="text-secondary">Tentang</span>  INA
                    </h1>
                    <p className="mx-auto my-6 w-full text-grey ">
                    LPK PT INDONESIA NIPPON ANUGERAH Dibentuk pada 28 Oktober 2021, berperan 
                    dalam pemberdayaan SDM khususnya generasi muda melalui program pembentukan sikap mental, keterampilan, serta 
                    kemandirian yang meliputi program utama Diklat Bahasa Jepang Terpadu dan Pemagan gan ke Jepang. Moto utama 
                    kami mendidik siswa agar berwawasan luas, bertanggung jawab serta menjadi lebih mandiri dengan menerapkan 
                    kedisiplinan yang kuat sehingga bisa meminimalisir timbulnya permasalahan selama mereka magang di jepang. 
                    Untuk memperoleh hasil maksimal, LPK PT INDONESIA NIPPON ANUGERAH bekerja sama dengan lembaga lain yang 
                    terpercaya. Dengan mengikuti program ini, para peserta diharapkan dapat memiliki keterampilan yang memadai 
                    dan didukung oleh pengalaman, sikap kerja positif, dan kreatifitas. 
                    <br/>
                    <br/>
                    Dengan landasan cita-cita luhur untuk 
                    turut meningkatkan SDM dan terwujudnya kehidupan masyarakat yang sejahtera. Saat ini LPK PT INDONESIA NIPPON 
                    ANUGERAH bekerja sama dengan beberapa rumah sakit dan panti lansia serta beberapa perusahaan konstruksi,dimana 
                    nantinya siswa diwajibkan mengikuti praktek kerja sesuai bidang yang akan mereka magangkan. LPK PT INDONESIA 
                    NIPPON ANUGERAH berpusat di Kota Depok, dan memiliki cabang di
                    </p>
                </div>
            </div>
        </section>
    )
}