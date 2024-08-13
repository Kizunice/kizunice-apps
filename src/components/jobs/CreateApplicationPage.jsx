'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import Loading from "@/app/(dashboard)/loading";

export default function CreateApplicationPage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [formValues, setFormValues]  = useState({
        studentId: "",
        jobId: "",
        partnerId: "",
        note: "",
       
    })
    const{jobId, studentId,partnerId, status, note } = formValues
    const [optionsJ,setOptionsJ] = useState([])
    const [optionsS,setOptionsS] = useState([])
    const [optionsP,setOptionsP] = useState([])

    async function getDataJob() {
        // Fetch data
        const { data } = await axios.get("/api/jobs");
        const results = []
        console.log("Jobs :", data)
        data.forEach((value) => {
          results.push({
            label: value.title + " " + value.fieldJob,
            value: value.id,
          });
        });

        setOptionsJ([
          {key: 'Select a company', value: ''}, 
          ...results
        ])
        setLoading(false)
    }

    async function getDataStudent() {
        // Fetch data
        const { data } = await axios.get("/api/profile");
        const results = []
        console.log("students :", data)
        data.forEach((value) => {
        results.push({
            label: value.name + " " + value.asalLPK,
            value: value.id,
        });
        });

        setOptionsS([
        {key: 'Select a company', value: ''}, 
        ...results
        ])
        setLoading(false)
    }

    async function getDataPartner() {
      // Fetch data
      const { data } = await axios.get("/api/profile/partner");
      const results = []
      console.log("students :", data)
      data.forEach((value) => {
      results.push({
          label: value.name,
          value: value.id,
      });
      });

      setOptionsP([
      {key: 'Select a company', value: ''}, 
      ...results
      ])
      setLoading(false)
  }

    useEffect(() => {
        getDataJob()
        getDataStudent();
        getDataPartner();
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

   
    async function handleSubmit() {
      try {
        const response = await fetch("/api/jobs-application", {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: {
            "Content-Type": "application/json",
          },
        })
        
        if (response.ok) {
          toast.success("Berhasil menambahkan data belajar");
          router.push('/jobs-application')
          setLoading(false);
        } 
      } catch (error) {
        setLoading(false);
        console.error("Network Error:", error);
      }
    }

    if (loading) return <Loading />
    return (
        <>
            <Toaster />
            <TitleCard title="Tambah Data Lamaran" topMargin="mt-2"  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                        value={jobId}
                        placeholder="Pilih program kerja"
                        label="Program Kerja"
                        name="jobId"
                        options={optionsJ}
                        onChange={(value, meta) => handleSelect(value, meta)}
                    />
                    <SelectField
                        value={partnerId}
                        placeholder="Pilih Lembaga"
                        label="Nama Lembaga"
                        name="partnerId"
                        options={optionsP}
                        onChange={(value, meta) => handleSelect(value, meta)}
                    />
                    <SelectField
                        value={studentId}
                        placeholder="Pilih Siswa"
                        label="Nama Siswa"
                        name="studentId"
                        options={optionsS}
                        onChange={(value, meta) => handleSelect(value, meta)}
                    />
                     <InputField
                        type="text"
                        value={note}
                        placeholder="Menungu COE"
                        label="Keterangan"
                        name="note"
                        onChange={handleChange}
                    />
                </div>
                <div className="divider" ></div>
                <Button handleSubmit={handleSubmit} text={"Buat Data Lamaran"} loading={loading} />
            </TitleCard>
        </>
    )
}