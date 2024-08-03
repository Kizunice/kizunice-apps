'use client'
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import MultiSelectDropdown from "../ui/MultiSelectField";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateApplicationPage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues]  = useState({
        studentId: "",
        jobId: "",
        senseiId: "",
        senseiName: "",
       
    })
    const{learningId, studentId,senseiName, } = formValues
    const [optionsL,setOptionsL] = useState([])
    const [optionsS,setOptionsS] = useState([])

    const getUsers = async () => {
        setLoading(true)
        try {  
            const res = await axios.get('/api/profile/sensei');
            const users = res.data
            console.log(users)
            setFormValues({...formValues, senseiId : users.id, senseiName: users.name})
            console.log(res.data)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    async function fetchDataJobs() {
        // Fetch data
        const { data } = await axios.get("/api/jobs");
        const results = []
        console.log("Jobs :", data)
        data.forEach((value) => {
          results.push({
            label: value.title,
            value: value.id,
          });
        });

        setOptionsL([
          {key: 'Select a company', value: ''}, 
          ...results
        ])
    }

    async function fetchDataStudents() {
        // Fetch data
        const { data } = await axios.get("/api/profile");
        const results = []
        console.log("students :", data)
        data.forEach((value) => {
        results.push({
            label: value.name,
            value: value.id,
        });
        });

        setOptionsS([
        {key: 'Select a company', value: ''}, 
        ...results
        ])
    }

    useEffect(() => {
        // Trigger the fetch
        getUsers()
        fetchDataJobs();
        fetchDataStudents();
      }, []);

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        
        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    // const handleMulti = (selectedStudents) => {
    //     setFormValues({ ...formValues, students: selectedStudents});
    //     console.log(formValues)
    // }

    async function handleSubmit() {
        try {
          const response = await fetch("/api/score", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            // setLoading(false);
            toast.success("Berhasil menambahkan data belajar");
            router.push('/learning')
          } 
        } catch (error) {
        //   setLoading(false);
          console.error("Network Error:", error);
        }
      }

    return (
        <>
            <Toaster />
            <TitleCard title="Tambah Nilai Siswa" topMargin="mt-2"  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        type="text"
                        value={senseiName}
                        placeholder="Sensei"
                        label="Nama Sensei"
                        name="senseiName"
                        onChange={handleChange}
                    />
                    <SelectField
                        value={learningId}
                        placeholder="Materi Belajar"
                        label="Materi Belajar"
                        name="learningId"
                        options={optionsL}
                        onChange={handleChange}
                    />
                    <SelectField
                        value={studentId}
                        placeholder="Nama Siswa"
                        label="Nama Siswa"
                        name="studentId"
                        options={optionsS}
                        onChange={handleChange}
                    />
                </div>
                <div className="divider" ></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                </div>
                <div className="divider" ></div>

                
            </TitleCard>
        </>
    )
}