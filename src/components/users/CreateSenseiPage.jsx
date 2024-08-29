'use client'
import { useState } from "react";
import moment from "moment";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function CreateSenseiPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues]  = useState({
        name:"",
        email:"", 
        password:"", 
        address: "",
        phone: "",
        gender: "",
        dateOfBirth : "",
        placeOfBirth :""
    })
    const{name,email,password,address,phone, gender, dateOfBirth, placeOfBirth} = formValues
    const [options, setOptions] = useState([
        {
            label: "Laki-Laki",
            value: "Laki-Laki",
        },
        {
            label: "Perempuan",
            value: "Perempuan",
        },
    ])

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value});
    };

    const handleSelect = (value, meta) => {
        setFormValues({ ...formValues, [meta.name]: value.value});
    };

    async function handleSubmit() {
        setLoading(true);
        try {
          const response = await fetch("/api/register/sensei", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil membuat akun sensei");
            router.push('/data-sensei')
            setLoading(false);
          } else {
            toast.error("Gagal membuat akun sensei, Coba lagi");
            setLoading(false);
          }
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
      }

    return (
        <TitleCard title="Tambah Akun Sensei" topMargin="mt-2"  >
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
                    placeholder="Nama Lengkap"
                    label="Nama Lengkap"
                    name="name"
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={address}
                    placeholder="Alamat"
                    label="Alamat"
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
                <SelectField
                    defaultValue={gender}
                    label="Jenis Kelamin"
                    placeholder="Pilih Jenis Kelamin"
                    name="gender"
                    options={options}
                    onChange={(value, meta) => handleSelect(value, meta)}
                />
                <InputField
                    type="text"
                    value={placeOfBirth}
                    placeholder="Jakarta"
                    label="Tempat Lahir"
                    name="placeOfBirth"
                    onChange={handleChange}
                />
                <InputField
                    type="date"
                    value={moment(dateOfBirth).format("YYYY-MM-DD")}
                    placeholder="Tanggal Lahir"
                    label="Tanggal Lahir"
                    name="dateOfBirth"
                    onChange={handleChange}
                />
            </div>
            <div className="divider" ></div>
            <Button text={"Buat Akun"} handleSubmit={handleSubmit} loading={loading} />
        </TitleCard>
    )
}