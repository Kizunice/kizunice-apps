'use client'
import { useState, useEffect } from 'react';
import TitleCard from '../ui/TitleCards';
import SelectField from '../ui/SelectField';
import axios from 'axios';
import Button from '../ui/Button';
import toast from "react-hot-toast";
import moment from 'moment';
import 'moment/locale/ja';
import {saveAs} from 'file-saver';
import { RiFileDownloadFill } from "react-icons/ri";
import Loading from '@/app/(dashboard)/loading';

export default function DocumentPage() {
    const [optionsS,setOptionsS] = useState([])
    const [path, setPath] = useState('')
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [docs,setDocs] = useState([])
    const [formValues,setFormValues] = useState({
        studentId: "",
        name : ""
    })
    const [options, setOptions] = useState([
        {
            label: "CV",
            value: "FORMAT_CV.xlsx",
        },
        {
            label: "Kontrak Kerja",
            value: "FORMAT_Kontrak_Kerja.xlsx",
        },
    ])
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
        setPageLoading(false)
    }

    const getDocument = async () => {
        try {  
            const res = await axios.get('/api/document');
            const doc  = res.data
            console.log("doc:", doc)
            setDocs(doc)
        } catch (err) {
          console.log("[collections_GET]", err);
        }
      };

    useEffect(() => {
        getDataStudent();
        getDocument()
        console.log(moment().format("YY MMM"))
      }, []);

    const handleSelect = (value, meta) => {
        setFormValues({ ...formValues, [meta.name]: value.value});
        console.log(formValues)
    };

    async function handleSubmit() {
        setLoading(true)
        try {
          const response = await fetch("/api/document", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil membuat cv");
            location.reload()
            setLoading(false);
          } 
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
      }

    async function handleDownload(values) {
        setLoading(true);
        try {
            const data = values.link
            saveAs(data, `CV-${values.student.name}.xlsx`);
            setLoading(false);
        } catch (err) {
            console.log("[collections_GET]", err);
            setLoading(false);
        }
    }

    if(pageLoading) return <Loading/>
    return (
        <>
        <TitleCard title={"Dokumen CV Siswa"} topMargin="mt-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SelectField
                    defaultValue={formValues.studentId}
                    placeholder="Pilih Nama Siswa"
                    label="Nama Siswa"
                    name="studentId"
                    options={optionsS}
                    onChange={(value, meta) => handleSelect(value, meta)}
                />
                <SelectField
                    value={options.filter((data) => data.value === formValues.name)}
                    placeholder="Pilih Dokumen"
                    label="Pilih Dokumen"
                    name="name"
                    options={options}
                    onChange={(value, meta) => handleSelect(value, meta)}
                />

            </div>
            
            <div className="flex flex-col lg:flex-row gap-4 mt-8">
                <Button handleSubmit={handleSubmit} text={"Buat Data CV"} loading={loading} />
            </div>
        </TitleCard>
        <TitleCard title={"Data CV"} topMargin="mt-2">
            <div className="overflow-x-auto lg:overflow-hidden w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-secondary text-[14px]">
                        <th>No</th>
                        <th>Staff</th>
                        <th>Nama Siswa</th>
                        <th>Asal LPK</th>
                        <th>Tanggal Pembuatan</th>
                        <th>Download</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            docs.map((doc,idx) =>{
                                return (
                                    <tr key={idx} className="text-grey ">
                                        <td>{idx+1}</td>
                                        <td>{doc.staff.name}</td>
                                        <td>{doc.student.name}</td>
                                        <td>{doc.student.asalLPK}</td>
                                        <td>{moment(doc.createdAt).format("ll")}</td>
                                        <td>
                                            <RiFileDownloadFill 
                                                onClick={() => handleDownload(doc)} 
                                                className="text-primary cursor-pointer p-1 text-3xl"
                                            />
                                        </td>
                                    </tr>
                                )
                            })    
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
        </>
    )
}