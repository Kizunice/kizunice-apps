'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import moment from "moment"
import toast from "react-hot-toast"
import ImageUpload from "../ui/ImageUpload"
import Button from "../ui/Button"
import Loading from "@/app/(dashboard)/loading"
import SelectField from "../ui/SelectField"

export default function ProfileStaffPage(){
    const [loading, setLoading] = useState(false)
    const [pageloading, setPageLoading] = useState(true)
    const [optionsG, setOptionsG] = useState([
        {
            label: "Laki-Laki",
            value: "Laki-Laki",
        },
        {
            label: "Perempuan",
            value: "Perempuan",
        },
    ])
    const [options, setOptions] = useState([
        {
            label: "Staff Dokumen",
            value: "DOCUMENT",
        },
        {
            label: "Staff Keuangan",
            value: "FINANCE",
        },
    ])
    const [formValues, setFormValues]  = useState({})
    const { image, name, email, role, address, phone, gender, dateOfBirth, placeOfBirth } = formValues;
 
    const getUserData = async () => {
        try {  
            const res = await axios.get('/api/data/staff');
            setFormValues(res.data)
            setPageLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setPageLoading(false)
        }
      };

    useEffect(() => {
    getUserData();
    }, []);

    const saveAvatar = (url) => {
        setFormValues(formValues => ({
            ...formValues,
            image : url
        }))
    }

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
            const response = await fetch("/api/data/staff", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Profile Update Success");
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
    }

    if(pageloading) return <Loading />
    return(
        <TitleCard title="Profile" topMargin="mt-2"  >
            <ImageUpload onUploadSuccess={saveAvatar} url={image} sizes="w-[200px] h-[200px]" />
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
                value={email}
                placeholder="Alamat Email"
                label="Email"
                name="email"
                onChange={handleChange}
            />
            <SelectField
                type="text"
                value={options.find((data) => data.value === role)}
                label="Role"
                name="role"
                options={options}
                onChange={(value, meta) => handleSelect(value, meta)}
            />
            <InputField
                type="text"
                value={address}
                label="Alamat"
                name="address"
                onChange={handleChange}
            />
            <InputField
                type="text"
                value={phone}
                label="No. Handphone"
                name="phone"
                onChange={handleChange}
            />
            <SelectField
                defaultValue={optionsG.find(({value}) => value === gender)}
                label="Jenis Kelamin"
                placeholder={"Pilih jenis kelamin"}
                name="gender"
                options={optionsG}
                onChange={(value, meta) => handleSelect(value, meta)}
            />
            <InputField
                type="text"
                value={placeOfBirth}
                label="Tempat Lahir"
                name="placeOfBirth"
                onChange={handleChange}
            />
            <InputField
                type="date"
                value={moment(dateOfBirth).format("YYYY-MM-DD")}
                label="Tanggal Lahir"
                name="dateOfBirth"
                onChange={handleChange}
            />
            </div>
            <div className="divider" ></div>
            <Button handleSubmit={handleSubmit} loading={loading} text={'Update Profile'} />
        </TitleCard>
    )
}

