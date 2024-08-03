'use client'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import SelectField from "../ui/SelectField"
import Button from "../ui/Button"
import toast, { Toaster } from "react-hot-toast";
import moment from "moment"

export default function CreateJobsPage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [optionsS, setOptionsS] = useState([])
    const [optionsC, setOptionsC] = useState([])
    const [formValues, setFormValues]  = useState({
        userId : session?.user.id,
        supervisorId : "",
        companyId : "",
        title :"", 
        fieldJob :"",          
        typeJob :"",             
        description :"",        
        needs  :"",    
        gender: "",         
        location :"",           
        requirement : "",       
        detail : "",          
        benefit :"",            
        salary :"",            
        deadline :"",
        interview :"",
        departure :"",
    })
    const { userId, supervisorId, companyId, title, fieldJob, typeJob, description, needs, gender, location, requirement, detail, benefit, salary, deadline, departure } = formValues;
    const [options, setOptions] = useState([
        {
            label: "Laki-Laki",
            value: "Laki-Laki",
        },
        {
            label: "Perempuan",
            value: "Perempuan",
        },{
            label: "Laki-Laki dan Perempuan",
            value: "Laki-Laki dan Perempuan",
        },
    ])
    async function fetchDataSupervisor() {
        // Fetch data
        const { data } = await axios.get("/api/profile/partner");
        const supervisor = []
        const company = []
        console.log("my learning :", data)
        data.forEach((value) => {
          supervisor.push({
            label: value.supervisor,
            value: value.id,
          });
          value.company.forEach((com) => {
            company.push({
              label: com.name,
              value: com.id,
            });
          });
        });

        setOptionsS([
          {key: 'Select a company', value: ''}, 
          ...supervisor
        ])
        setOptionsC([
            {key: 'Select a company', value: ''}, 
            ...company
          ])
    }
    useEffect(() => {
        // Trigger the fetch
        fetchDataSupervisor();
      }, []);

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    async function handleSubmit(event) {
        setLoading(true);
        try {
          const response = await fetch("/api/jobs", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil menambah lowongan kerja");
            router.push('/jobs')
            setLoading(false);
          } 
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
      }
    return(
        <>
            <Toaster />
            <TitleCard title="Tambah Lowongan Kerja" topMargin="mt-2"  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    value={supervisorId}
                    placeholder="Nama Lembaga Pengawas"
                    label="Nama Lembaga Pengawas"
                    name="supervisorId"
                    options={optionsS}
                    onChange={handleChange}
                />
                <SelectField
                    value={companyId}
                    placeholder="Nama Perusahaan"
                    label="Nama Perusahaan"
                    name="companyId"
                    options={optionsC}
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={title}
                    placeholder="Contoh : Tokutei Ginou"
                    label="Nama Program"
                    name="title"
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={fieldJob}
                    placeholder="Contoh : Kaigo"
                    label="Bidang Pekerjaan"
                    name="fieldJob"
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={typeJob}
                    placeholder="Contoh : Merawat Lansia"
                    label="Jenis Pekerjaan"
                    name="typeJob"
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={needs}
                    placeholder="Contoh: 3 Orang"
                    label="Jumlah Pekerja"
                    name="needs"
                    onChange={handleChange}
                />
                <SelectField
                    value={gender}
                    defaultValue={gender}
                    label="Jenis Kelamin"
                    placeholder="Laki-Laki"
                    name="gender"
                    options={options}
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={location}
                    placeholder="Contoh : Kochi-ken"
                    label="Lokasi Pekerjaan"
                    name="location"
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={salary}
                    placeholder="Contoh : 150,000"
                    label="Estimasi Gaji"
                    name="salary"
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={benefit}
                    placeholder="Keuntungan"
                    label="Keuntungan"
                    name="benefit"
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={detail}
                    placeholder="Jam Kerja"
                    label="Detail Pekerjaan"
                    name="detail"
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={requirement}
                    placeholder="Contoh : JLPT N4"
                    label="Kualifikasi"
                    name="requirement"
                    onChange={handleChange}
                />
                <InputField
                    type="date"
                    value={deadline}
                    label="Tanggal Terakhir"
                    name="deadline"
                    onChange={handleChange}
                />
                <InputField
                    type="date"
                    value={departure}
                    label="Tanggal Keberangkatan"
                    name="departure"
                    onChange={handleChange}
                />
                
                    
                </div>
                <div className="divider" ></div>
                
                <Button handleSubmit={handleSubmit} text={"Buat Program"} loading={loading} />
                
            </TitleCard>
        </>
    )
}