'use client'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import SelectField from "../ui/SelectField"
import toast, { Toaster } from "react-hot-toast";
import moment from "moment"
import ImageUpload from "../ui/ImageUpload"
import Button from "../ui/Button"
import Loading from "@/app/(dashboard)/loading"

export default function ProfileSenseiPage(){
    const {data:session} =  useSession()
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [avatar, setAvatar] = useState(null)
    const [formValues, setFormValues]  = useState({})
    const { 
        name, 
        email, 
        image, 
        phone, 
        address, 
        gender, 
        dateOfBirth, 
        placeOfBirth, 
      
    } = formValues;

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

    const getProfileData = async () => {
        try {  
            const res = await axios.get('/api/profile/sensei');
            const profile  = res.data
            console.log("profile data :", profile)
            if(profile.length !== 0) {
                setFormValues(profile)
            }
            setPageLoading(false);
        } catch (err) {
          console.log("[collections_GET]", err);
          setPageLoading(false);
        }
      };

    useEffect(() => {
    getProfileData();
    }, []);


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

    const saveAvatar = (url) => {
        setFormValues(formValues => ({
            ...formValues,
            image : url
        }))
    }

    async function handleSubmit() {
        setLoading(true);
        try {
            console.log(formValues)
            const response = await fetch("/api/profile/sensei", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Profile Update Success");
            setLoading(false);
          } 
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
    }
    
    if(pageLoading) return <Loading />
    return(
        <>
            <TitleCard title="Data Sensei" topMargin="mt-2"  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ImageUpload onUploadSuccess={saveAvatar} url={image} sizes="w-[200px] h-[200px]" />
                   
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
                    <InputField
                        type="text"
                        value={address}
                        placeholder="Jalan Mangga Besar"
                        label="Alamat Rumah"
                        name="address"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={phone}
                        placeholder="+62 8XXXXXXXXX"
                        label="Nomor Handphone Pribadi"
                        name="phone"
                        onChange={handleChange}
                    />
                  
                    <SelectField
                        defaultValue={options.find(({value}) => value === gender)}
                        label="Jenis Kelamin"
                        placeholder={"Pilih jenis kelamin"}
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

                <Button handleSubmit={handleSubmit} loading={loading} text={'Update Profile'} />
            </TitleCard>
        </>
      
    )
}

