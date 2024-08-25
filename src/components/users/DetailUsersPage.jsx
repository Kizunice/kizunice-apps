'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import moment from "moment"
import ImageUpload from "../ui/ImageUpload"
import Loading from "@/app/(dashboard)/loading"

export default function DetailUsersPage(){
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [options, setOptions] = useState([
        {
            label: "Staff Dokumen",
            value: "DOCUMENT",
        },
        {
            label: "Staff Keuangan",
            value: "FINANCE",
        },
        {
            label: "Sensei",
            value: "SENSEI",
        },
    ])
    const [formValues, setFormValues]  = useState({})
    const { image, name, email, role, address, phone, gender, dateOfBirth, placeOfBirth } = formValues;
 
    const getUserData = async () => {
        setLoading(true)
        try {  
            const res = await axios.get(`/api/data/${params.id}`);
            setFormValues(res.data)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
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

    if(loading) return <Loading />
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
                readOnly="readOnly"
            />
            <InputField
                type="text"
                value={email}
                placeholder="Alamat Email"
                label="Email"
                name="email"
                readOnly="readOnly"
            />
            <InputField
                type="text"
                value={role ? options.find((data) => data.value === role).label : "Sensei"}
                label="Role"
                name="role"
                readOnly="readOnly"
            />
                <InputField
                type="text"
                value={address}
                label="Alamat"
                name="address"
                readOnly="readOnly"
            />
                <InputField
                type="text"
                value={phone}
                label="No. Handphone"
                name="phone"
                readOnly="readOnly"
            />
                <InputField
                type="text"
                value={placeOfBirth}
                label="Tempat Lahir"
                name="placeOfBirth"
                readOnly="readOnly"
            />
            <InputField
                type="date"
                value={moment(dateOfBirth).format("YYYY-MM-DD")}
                label="Tanggal Lahir"
                name="dateOfBirth"
                readOnly="readOnly"
            />
            </div>
            <div className="divider" ></div>
        </TitleCard>
    )
}

