'use client'
import Image from "next/image"
import { PROGRAMS } from "@/lib/consData"
export default function Program() {
    
    return (
        <section className="warpper lg:max-w-[1300px] mx-auto py-[4rem] lg:py-[6rem]" id="program" >
            <div className="flex flex-col justify-center items-center">
                <div className="px-8 text-center lg:px-12 lg:max-w-3xl lg:mt-[-4em] md:mt-[-2em] mb-8">
                    <h1 className="text-primary font-semibold my-6 w-full leading-snug !text-4xl lg:max-w-4xl lg:!text-7xl">
                        <span className="text-secondary">Program</span>  Kizunice
                    </h1>
                    <p className="mx-auto my-6 w-full text-grey ">
                        Kizuna Indonesia Nippon adalah lembaga pelatihan yang didedikasikan 
                        untuk membantu para pencari kerja mewujudkan impian mereka bekerja di Jepang. 
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6 px-8">
                    {
                        PROGRAMS.map((data) =>{
                            return (
                                <div key={data.id} className="card w-74 bg-base-100 shadow-sm">
                                    <figure><img src={data.image} alt={data.title} className="rounded-sm pt-6 md:py-0" /></figure>
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
        </section>
    )
}