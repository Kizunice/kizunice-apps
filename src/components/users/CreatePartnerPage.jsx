'use client'
import { useState } from "react";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import InputField from "../ui/InputField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

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
                <Button handleSubmit={handleSubmit} text={"Buat Akun"} loading={loading} />
            </TitleCard>
    )
}