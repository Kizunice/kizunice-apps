'use client'
import { useState } from "react";
import moment from "moment";
import { useSession } from "next-auth/react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function SenseiRegister() {
    const {data:session} =  useSession()
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
        console.log(formValues);
    };

    const handleSelect = (value, meta) => {
        setFormValues({ ...formValues, [meta.name]: value.value});
        console.log(formValues)
    };

    async function handleSubmit() {
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
            router.push(`/email/verify/`);
            setLoading(false);

          } 
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
      }

    return (
        <div className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <InputField
                    type="email"
                    value={email}
                    placeholder="name@company.com"
                    label="Email"
                    name="email"
                    labelStyle="text-white text-md"
                    onChange={handleChange}
                />
                <InputField
                    type="password"
                    value={password}
                    placeholder="********"
                    label="Password"
                    name="password"
                    labelStyle="text-white"
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-4 mb-4">
                <InputField
                    type="text"
                    value={name}
                    placeholder="Nama Lengkap"
                    label="Nama Lengkap"
                    name="name"
                    labelStyle="text-white"
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={address}
                    placeholder="Alamat"
                    label="Alamat"
                    name="address"
                    labelStyle="text-white"
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    type="text"
                    value={phone}
                    placeholder="+6208XXXXXXX"
                    label="Nomor Handphone"
                    name="phone"
                    labelStyle="text-white"
                    onChange={handleChange}
                />
                <SelectField
                    placeholder={"Pilih"}
                    defaultValue={gender}
                    label="Jenis Kelamin"
                    name="gender"
                    labelStyle="text-white"
                    options={options}
                    onChange={(value, meta) => handleSelect(value, meta)}
                />
                <InputField
                    type="text"
                    value={placeOfBirth}
                    placeholder="Jakarta"
                    label="Tempat Lahir"
                    name="placeOfBirth"
                    labelStyle="text-white"
                    onChange={handleChange}
                />
                <InputField
                    type="date"
                    value={moment(dateOfBirth).format("YYYY-MM-DD")}
                    placeholder="Tanggal Lahir"
                    label="Tanggal Lahir"
                    name="dateOfBirth"
                    labelStyle="text-white"
                    onChange={handleChange}
                />
            </div>
            <div className="divider" ></div>
            <Button text={"Buat Akun"} handleSubmit={handleSubmit} loading={loading} />
        </div>
    )
}