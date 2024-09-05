'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useParams } from 'next/navigation'
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import SelectField from "../ui/SelectField"
import moment from "moment"
import toast from "react-hot-toast"
import ImageUpload from "../ui/ImageUpload"
import Loading from "@/app/(dashboard)/loading"
import Button from "../ui/Button"

export default function DetailUsersPage(){
    const {data:session} =  useSession()
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
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

    const [optionsS, setOptionsS] = useState([
        {
            label: "Aktif",
            value: "ACTIVE",
        },
        {
            label: "Tidak Aktif",
            value: "NONACTIVE",
        },
    ])
    const [formValues, setFormValues]  = useState({})
    const { image, name, email, role, address, phone, gender, dateOfBirth, placeOfBirth, accStatus } = formValues;
 
    const getUserData = async () => {
        try {  
            const res = await axios.get(`/api/data/${params.id}`);
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

    const handleSelect = (value, meta) => {
        setFormValues({ ...formValues, [meta.name]: value.value});
        console.log(formValues)
    };

    async function handleSubmit() {
        setLoading(true);
        try {
        //   const response = await fetch(`/api/data/${params.id}`, {
        //     method: "POST",
        //     body: JSON.stringify(formValues),
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   })
          const response = await fetch('/api/data', {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil ubah status akun");
            setLoading(false);
          } else {
            toast.error("Gagal ubah status akun, Coba lagi");
            setLoading(false);
          }
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
    }

    if(pageLoading) return <Loading />
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
                value={gender}
                label="Jenis Kelamin"
                name="gender"
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
                value={dateOfBirth ? moment(dateOfBirth).format("yyyy-MM-dd") : null}
                label="Tanggal Lahir"
                name="dateOfBirth"
                readOnly="readOnly"
            />
            <SelectField
                defaultValue={optionsS.find((data) => data.value === accStatus)}
                label="Status Akun"
                name="accStatus"
                options={optionsS}
                onChange={(value, meta) => handleSelect(value, meta)}
            />
            </div>
            <div className="divider" ></div>
            <Button text={"Ubah Status"} handleSubmit={handleSubmit} loading={loading} />
        </TitleCard>
    )
}

