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
import { STATUS_OPTION } from "@/constants/routes";

export default function CreateApplicationPage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)
    const [formValues, setFormValues]  = useState({
      userId: session?.user.id,
      studentId: "",
      jobId: "",
      partnerId: "",
      note: "",
      status:""
    })
    const{jobId, studentId,partnerId, status, note } = formValues
    const [optionsJ,setOptionsJ] = useState([])
    const [optionsS,setOptionsS] = useState([])
    const [optionsP,setOptionsP] = useState([])
    const [options, setOptions] = useState([
      {
          label: "Belum Diterima",
          value: false,
      },
      {
          label: "Sudah Diterima",
          value: true,
      },
  ])
    async function getDataJob() {
        const { data } = await axios.get("/api/jobs");
        const results = []
        console.log("Jobs :", data)
        data.forEach((value) => {
          results.push({
            label: value.title + " " + value.fieldJob + " " + value.company.name,
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
        const { data } = await axios.get("/api/profile");
        const results = []
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
      const { data } = await axios.get("/api/profile/partner");
      const results = []
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
    };

    const handleSelect = (value, meta) => {
      setFormValues({ ...formValues, [meta.name]: value.value});
    };

   
    async function handleSubmit() {
      setBtnLoading(true);
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
          setBtnLoading(false);
        } 
      } catch (error) {
        setLoading(false);
        setBtnLoading(false);
        console.error("Network Error:", error);
      }
    }

    if (loading) return <Loading />
    return (
      <TitleCard title="Tambah Data Lamaran" topMargin="mt-2"  >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                  placeholder="Pilih program kerja"
                  label="Program Kerja"
                  name="jobId"
                  options={optionsJ}
                  onChange={(value, meta) => handleSelect(value, meta)}
              />
              <SelectField
                  defaultValue={partnerId}
                  placeholder="Pilih Lembaga"
                  label="Nama Lembaga"
                  name="partnerId"
                  options={optionsP}
                  onChange={(value, meta) => handleSelect(value, meta)}
              />
              <SelectField
                  defaultValue={studentId}
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
              <SelectField
                  value={options.find(({value}) => value === formValues.status)}
                  label="Status Lamaran"
                  placeholder="Pilih Status Lamaran"
                  name="status"
                  options={STATUS_OPTION}
                  onChange={(value, meta) => handleSelect(value, meta)}
              />
          </div>
          <div className="divider" ></div>
          <Button handleSubmit={handleSubmit} text={"Buat Data Lamaran"} loading={btnLoading} />
      </TitleCard>
    )
}