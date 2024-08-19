'use client'
import { useEffect, useState } from "react"

export default function SendVerification() {
    const [verified, setVerified] = useState(false)
    if(!verified) {
        return (
            <div className="flex flex-col gap-2">
                <div className='mb-4 text-lg text-white text-center'>Kami telah mengirimkan link verifikasi ke email kamu</div>
                <div className='mb-4 text-sm text-gray-300 text-center'>Silahkan cek email yang kamu daftarkan dan klik link tersebut untuk verifikasi</div>
            </div>
        )
    } 
   
}