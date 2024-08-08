'use client'
import { useState, useEffect } from 'react';
import TitleCard from '../ui/TitleCards';
import SelectField from '../ui/SelectField';
import axios from 'axios';
import Button from '../ui/Button';
import toast from "react-hot-toast";

export default function DocumentPage() {
    const downloadPath = `/doc/CV.xlsx`
    const [optionsS,setOptionsS] = useState([])
    const [path, setPath] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingB, setLoadingB] = useState(false)
    const [loadingD, setLoadingD] = useState(true)
    const [studentId,setStudentId] = useState('')

    async function getDataStudent() {
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

    useEffect(() => {
        getDataStudent();
      }, []);

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        
        setStudentId({ [name]: value});
        console.log(studentId)
    };

    async function handleSubmit() {
        setLoadingB(true)
        try {
          const response = await fetch("/api/document", {
            method: "POST",
            body: JSON.stringify(studentId),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            console.log(response)
            toast.success("Berhasil membuat cv");
            setLoadingB(false);
            setLoadingD(false);
          } 
        } catch (error) {
          setLoading(false);
          console.error("Network Error:", error);
          setLoadingD(false);
        }
      }

    async function handleDownload(value) {
        const id = value.studentId
        setLoadingB(true)
        try {
            const res = await axios.get(`/api/data/student/${id}`);
            const profile  = res.data
            const URL = `/doc/CV-${profile.name}.xlsx`
            const link = document.createElement("a");
            link.href = URL;
            link.setAttribute("download", "CV-" + profile.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setLoadingB(false)
        } catch (err) {
            console.log("[collections_GET]", err);
            setLoadingB(false);
        }
    }


    return (
        <TitleCard title={"Dokumen CV Siswa"} topMargin="mt-2">
            <SelectField
                value={studentId}
                optionName="Pilih Siswa"
                label="Nama Siswa"
                name="studentId"
                options={optionsS}
                onChange={handleChange}
            />
            <div className="flex flex-col lg:flex-row gap-4 mt-8">
                <Button handleSubmit={handleSubmit} text={"Buat Data CV"} loading={loadingB} />
                <Button handleSubmit={() => handleDownload(studentId)} text={"Download CV"} loading={loadingB} />
            </div>
            {/* <button 
                onClick={() => download(studentId)}
                className='w-full text-white bg-primary mt-4 hover:bg-secondary disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                Download CV
            </button> */}
            {/* <button 
                disabled={loadingD} 
                href={downloadPath} 
                download="CV-Nibel Ghifari"  
                className='w-full text-white bg-primary mt-4 hover:bg-secondary disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                Download CV
            </button> */}
        </TitleCard>
    )
}