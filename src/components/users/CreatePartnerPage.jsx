'use client'
import { useState } from "react";
import TitleCard from "@/components/ui/TitleCards";
import InputField from "../ui/InputField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function CreatePartnerPage() {
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

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value});
    };

    async function handleSubmit() {
        setLoading(true);
        try {
          const response = await fetch("/api/register/partner", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil membuat akun lembaga");
            router.push('/data-partner')
            setLoading(false);
          } else {
            toast.error("Gagal membuat akun lembaga, Coba lagi");
            setLoading(false);
          }
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
      }

    return (
      <TitleCard title="Buat Akun Lembaga" topMargin="mt-2"  >
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