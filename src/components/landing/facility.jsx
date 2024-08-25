'use client'
import Image from "next/image"
import { FACILITY } from "@/lib/consData"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function Facility() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    
    return (
        <section className="lg:max-w-[80rem] w-full mx-auto pb-[4rem] lg:py-[6rem]" id="facility" >
            <div className="flex flex-col justify-center items-center px-8 mb-[2rem]">
                <div className="text-center lg:px-12 lg:max-w-3xl lg:mt-[-4em] md:mt-[-2em] mb-4">
                    <h1 className="text-primary font-semibold my-6 w-full leading-snug !text-4xl lg:max-w-4xl lg:!text-7xl">
                        <span className="text-secondary">FASILITAS</span>  INA
                    </h1>
                </div>
            </div>
            <Slider {...settings} className="my-4 px-8">
                {FACILITY.map((data)=>(
                    <img key={data.key} src={data.image} className="rounded-lg" alt="INA"/>
                ))}
            </Slider>
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