'use client'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import SelectField from "../ui/SelectField"
import Button from "../ui/Button"
import toast from "react-hot-toast";

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
        linkFile:'',          
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
    const { userId, supervisorId, companyId, title, fieldJob, typeJob, linkFile, needs, gender, location, requirement, detail, benefit, salary, deadline, departure } = formValues;
    const [options, setOptions] = useState([
        {
            label: "Laki-Laki",
            value: "Laki-Laki",
        },
        {
            label: "Perempuan",
            value: "Perempuan",
        },{
            label: "Laki-Laki & Perempuan",
            value: "Laki-Laki & Perempuan",
        },
    ])
    async function fetchDataSupervisor() {
        const {data} = await axios.get("/api/data/partner");
        const supervisor = []
        const company = []
        console.log("my learning :", data)

        if(data instanceof Array) {
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
        }
       
        setFormValues({...formValues, supervisorId: data.id})
        supervisor.push({
            label: data.supervisor,
            value: data.id,
        });
        data.company.forEach((com) => {
            company.push({
                label: com.name,
                value: com.id,
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
        fetchDataSupervisor();
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
            toast.success("Berhasil menambah Program kerja");
            router.push('/jobs')
            setLoading(false);
          } 
          setLoading(false);
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
      }
    return(
        <TitleCard title="Tambah Lowongan Kerja" topMargin="mt-2"  >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    defaultValue={supervisorId}
                    // value={optionsS.find(({value}) => value === supervisorId)}
                    placeholder="Pilih Lembaga Pengawas"
                    label="Nama Lembaga Pengawas"
                    name="supervisorId"
                    options={optionsS}
                    onChange={(value, meta) => handleSelect(value, meta)}
                />
                <SelectField
                    defaultValue={companyId}
                    placeholder="Pilih Nama Perusahaan"
                    label="Nama Perusahaan"
                    name="companyId"
                    options={optionsC}
                    onChange={(value, meta) => handleSelect(value, meta)}
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
                    defaultValue={gender}
                    label="Jenis Kelamin"
                    placeholder="Pilih Jenis Kelamin"
                    name="gender"
                    options={options}
                    onChange={(value, meta) => handleSelect(value, meta)}
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
                <InputField
                    type="text"
                    value={linkFile}
                    label="Link File TSK"
                    name="linkFile"
                    onChange={handleChange}
                />
            </div>
            <div className="divider" ></div>
            <Button handleSubmit={handleSubmit} text={"Buat Program"} loading={loading} />
        </TitleCard>
    )
}