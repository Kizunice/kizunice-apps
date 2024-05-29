'use client'
import Image from "next/image"
import { PROGRAMS } from "@/lib/consData"
export default function Program() {
    
    return (
        <section className="warpper lg:max-w-[80rem] mx-auto py-[4rem] lg:py-[6rem]" id="program" >
            <div className="flex flex-col justify-center items-center px-8 mb-[4rem]">
                <div className="text-center lg:px-12 lg:max-w-3xl lg:mt-[-4em] md:mt-[-2em] mb-8">
                    <h1 className="text-primary font-semibold my-6 w-full leading-snug !text-4xl lg:max-w-4xl lg:!text-7xl">
                        <span className="text-secondary">Program</span>  Kizunice
                    </h1>
                    <p className="mx-auto my-6 w-full text-grey ">
                        Program Pelatihan Komprehensif untuk Karier Cemerlang di Jepang
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6">
                    {
                        PROGRAMS.map((data) =>{
                            return (
                                <div key={data.id} className="card w-66 bg-base-100 shadow-sm">
                                    {/* <figure><img src={data.image} alt={data.title} className="object-cover rounded-sm pt-6 md:py-0" /></figure> */}
                                    <Image src={data.image} width={300} height={100} className="object-cover w-full rounded-t-xl object-center" />
                                    <div className="card-body">
                                        <h2 className="card-title">{data.title}</h2>
                                        <p className="text-gray-500">{data.desc}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* <div className="flex flex-row gap-6 px-8">
                <div className=" w-[50%] lg:max-w-3xl">
                    <h6 className="text-center text-primary font-semibold my-6 w-full leading-snug !text-2xl lg:max-w-4xl lg:!text-4xl">
                        Persyaratan
                    </h6>
                </div>  
                <div className=" w-[50%] lg:max-w-3xl">
                    <h6 className="text-center text-primary font-semibold my-6 w-full leading-snug !text-2xl lg:max-w-4xl lg:!text-4xl">
                        Alur Pendaftaran
                    </h6>
                </div>
            </div> */}
        </section>
    )
}