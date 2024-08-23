'use client'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useParams, useRouter } from 'next/navigation'
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Loading from "@/app/(dashboard)/loading";
import SelectField from "../ui/SelectField"
import { STATUS_OPTION } from "@/constants/routes"

export default function EditApplicationPage(){
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [formValues, setFormValues]  = useState({})
    const [options, setOptions] = useState([
      {
        label: "Pengajuan",
        value: "Pengajuan",
      },
      {
        label: "Diterima",
        value: "Diterima",
      },
      {
        label: "Ditolak",
        value: "Ditolak",
      },
      {
        label: "Cadangan",
        value: "Cadangan",
      },
  ])
    const getAppJob = async () => {
        try {  
            const res = await axios.get(`/api/jobs-application/${params.jobId}`);
            console.log(res.data)
            setFormValues(res.data)
            setPageLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setPageLoading(false)
        }
      };

    useEffect(() => {
    getAppJob();
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
        setLoading(true);
        try {
          const response = await fetch("/api/jobs-application/", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            setLoading(false);
            toast.success("Update data berhasil");
            router.push('/jobs-application')
          } 
        } catch (error) {
          setLoading(false);
          console.error("Network Error:", error);
        }
      }

    if (pageLoading) return <Loading/>
    return(
        <TitleCard title="Ubah Data Lamaran" topMargin="mt-2"  >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                  type="text"
                  value={formValues.student.name}
                  label="Nama Siswa"
                  readOnly="readOnly"
              />
              <InputField
                  type="text"
                  value={formValues.student.asalLPK}
                  label="Asal LPK"
                  readOnly="readOnly"
              />
              <InputField
                  type="text"
                  value={formValues.partner.name}
                  label="Nama Lembaga"
                  readOnly="readOnly"
              />
              <InputField
                  type="text"
                  value={formValues.job.fieldJob}
                  label="Bidang Pekerjaan"
                  readOnly="readOnly"
              />
              <InputField
                  type="text"
                  value={formValues.note}
                  label="Keterangan"
                  name= "note"
                  onChange={handleChange}
              />
              <SelectField
                  value={STATUS_OPTION.find(({value}) => value === formValues.status)}
                  label="Status Lamaran"
                  placeholder="Pilih Status Lamaran"
                  name="status"
                  options={STATUS_OPTION}
                  onChange={(value, meta) => handleSelect(value, meta)}
              />
            </div>
            <div className="divider" ></div>
            <Button handleSubmit={handleSubmit} loading={loading} text={"Update Data Lamaran"} />
        </TitleCard>
    )
}