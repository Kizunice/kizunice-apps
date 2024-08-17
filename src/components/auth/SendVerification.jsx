'use client'

import Link from "next/link"
import { useSearchParams, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Loading from "@/app/(auth)/loading"
import toast from "react-hot-toast"

export default function SendVerification() {
    const [isLoading, setIsLoading] = useState(true)
    const [verified, setVerified] = useState(false)


    if(!verified) {
        return (
            <div className="flex flex-col gap-2">
                <div className='mb-4 text-lg text-white text-center'>Kami telah mengirimkan link verifikasi ke email kamu</div>
                <div className='mb-4 text-sm text-gray-300 text-center'>Silahkan cek email yang kamu daftarkan dan klik link tersebut untuk verifikasi</div>
                {/* <div className='mt-4 text-center'>
                    <Link href='/login' className='bg-white py-2 px-3 rounded-lg'>Kirim ulang</Link>
                </div> */}
            </div>
        )
    } 
   
}