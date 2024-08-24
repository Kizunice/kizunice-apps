'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import moment from "moment";
import TitleCard from "@/components/ui/TitleCards";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Loading from "@/app/(dashboard)/loading";

export default function CreateAttendancePage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([])
    const [formValues, setFormValues]  = useState({
        userId : session?.user.id,
        name: session?.user.name,
        date : moment().format("YYYY-MM-DD"), 
        signOut: false,      
        signOutTime :'',
        status: '',    
        senseiId:""
    })
    const{date, signInTime, signOutTime, senseiId, status} = formValues  

    async function getDataSensei() {
        const { data } = await axios.get("/api/data/sensei");
        const results = []
        console.log("test data:", data)
        if (data) {
            data.forEach((value) => {
            results.push({
                label: value.name,
                value: value.id,
                });
            });
            setOptions([
                {key: 'Select a company', value: ''}, 
                ...results
            ])
        }
    }
  
    useEffect(() => {
        getDataSensei();
    }, []);

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value});
    };

    const handleSelect = (value, meta) => {
        setFormValues({ ...formValues, [meta.name]: value.value});
      };

    async function handleSubmit() {
        setLoading(true)
        try {
          const response = await fetch("/api/attendance", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil Input Presensi");
            setLoading(false)
            router.push("/attendance")
        } 
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false)
        }
    }

    if (loading) return <Loading />
    return (
        <TitleCard title="Presensi" topMargin="mt-2"  >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    type="date"
                    value={date}
                    placeholder="Tanggal Hari Ini"
                    label="Tanggal Hari Ini"
                    name="date"
                    readOnly="readOnly"
                />
                <SelectField
                    defaultValue={senseiId}
                    placeholder="Pilih Sensei"
                    label="Nama Sensei"
                    name="senseiId"
                    options={options}
                    onChange={(value, meta) => handleSelect(value, meta)}
                />
                <InputField
                    type="text"
                    value={status}
                    placeholder="Okey..."
                    label="Status"
                    name="status"
                    onChange={handleChange}
                />
            </div>
            <div className="divider" ></div>
            <Button handleSubmit={handleSubmit} text={"Buat Data Lamaran"} loading={loading} />
        </TitleCard>
    )
}