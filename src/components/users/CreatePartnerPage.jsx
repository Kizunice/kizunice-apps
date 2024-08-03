'use client'
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import MultiSelectDropdown from "../ui/MultiSelectField";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePartnerPage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues]  = useState({
        name:"",
        email:"", 
        password:"", 
        address: "",
        phone: "",
        supervisor: "",
        country: "",
    })
    const{name,email,password,address,phone,company,supervisor,country} = formValues
    const [options,setOptions] = useState([])

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        
        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    async function handleSubmit() {
        try {
          const response = await fetch("/api/register/partner", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil membuat akun rekanan");
            router.push('/data-partner')
            setLoading(false);

          } 
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
      }

    return (
        <>
            <Toaster />
            <TitleCard title="Tambah Akun Rekanan" topMargin="mt-2"  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        type="email"
                        value={email}
                        placeholder="name@company.com"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                    />
                    <InputField
                        type="password"
                        value={password}
                        placeholder="********"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="divider" ></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        type="text"
                        value={name}
                        placeholder="Nama Rekanan"
                        label="Nama Rekanan"
                        name="name"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={supervisor}
                        placeholder="Lembaga Pengawas"
                        label="Lembaga Pengawas"
                        name="supervisor"
                        onChange={handleChange}
                    />  
                    <InputField
                        type="text"
                        value={address}
                        placeholder="Alamat Perusahaan"
                        label="Alamat Perusahaan"
                        name="address"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={country}
                        placeholder="Jepang"
                        label="Negara Asal"
                        name="country"
                        onChange={handleChange}
                    />  
                     
                    <InputField
                        type="text"
                        value={phone}
                        placeholder="+6208XXXXXXX"
                        label="Nomor Handphone"
                        name="phone"
                        onChange={handleChange}
                    />
                </div>
                <div className="divider" ></div>

                {loading ? (
                    <button
                    disabled
                    type="button"
                    className="w-full text-white text-center justify-center items-center bg-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 inline-flex items-center"
                    >
                    <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                        />
                        <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                        />
                    </svg>
                    Mohon Tunggu...
                    </button>
                ) : (
                    <button
                    type="submit"
                    className="w-full text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    onClick={() => handleSubmit()}
                    >
                    Buat Akun
                    </button>
                )}
            </TitleCard>
        </>
    )
}