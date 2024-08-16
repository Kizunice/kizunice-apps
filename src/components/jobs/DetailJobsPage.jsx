'use client'
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import moment from "moment";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import Loading from "@/app/(dashboard)/loading";
import { formatterJPY } from "@/lib/utils";
import { TableAplicant } from "./TableApplicant";

function DetailJobsPage() {
    const params = useParams()
    const {data:session} =  useSession()
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(true)
    const getJobsDetail = async () => {
        try {  
            const res = await axios.get(`/api/jobs/${params.jobsId}`);
            console.log(res.data)
            setValues(res.data)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
    getJobsDetail();
    }, []);

    async function handleSubmit() {
        return confirm("Silahkan hubungi sensei")
    }

    const TopSide =() =>{
        if(values) {
            return <div className="text-primary font-bold text-xl">{values.title}</div>
        }
    }

    const ButtonApplication =  () =>{
        if (session?.user.role === "STUDENT")
        return (
            <Button text={"Lamar Pekerjaan"} loading={loading} handleSubmit={handleSubmit} />
        ) 
    }

    const TableApps =  ({values}) =>{
        if (session?.user.role !== "STUDENT"  )
        return (
            <TableAplicant values={values}/>
        ) 
    }

    if (loading) return <Loading />
    return (
        <TitleCard title={"Program Kerja"} topMargin="mt-2" TopSideButtons={<TopSide/>} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    type="text"
                    value={values.company.name}
                    label="Nama Perusahaan"
                    style="font-bold"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.supervisor.name}
                    label="Nama Lembaga Pengawas"
                    readOnly="readOnly"
                    style="font-bold"
                />
                <InputField
                    type="text"
                    value={values.fieldJob}
                    label="Bidang Pekerjaan"
                    readOnly="readOnly"
                    style="font-bold"
                />
                <InputField
                    type="text"
                    value={values.location}
                    label="Lokasi Pekerjaan"
                    readOnly="readOnly"
                    style="font-bold"
                />
                <InputField
                    type="date"
                    value={moment(values.interview).format("YYYY-MM-DD")}
                    label="Jadwal Interview"
                    readOnly="readOnly"
                    style="font-bold "
                />
                <InputField
                    type="date"
                    value={moment(values.departure).format("YYYY-MM-DD")}
                    label="Tanggal Keberangkatan"
                    readOnly="readOnly"
                    style="font-bold"
                />
               
                <div className="divider md:col-span-2 my-0" ></div>

                <InputField
                    type="text"
                    value={values.gender}
                    label="Jenis Kelamin"
                    readOnly="readOnly"
                    style="font-bold"
                />
                
                <InputField
                    type="text"
                    value={values.needs}
                    label="Pekerja"
                    readOnly="readOnly"
                    style="font-bold"
                />

                <div className="md:col-span-2">
                <InputField
                    type="text"
                    value={formatterJPY(values.salary)}
                    label="Gaji Kotor"
                    readOnly="readOnly"
                    style="font-bold"
                /> 
                </div>
            </div>
            <div className="divider my-8" ></div>
            <div className="overflow-x-auto w-full">
                <TableApps values={values.applications}/>
            </div>
            <ButtonApplication />
        </TitleCard>
    );
}

export default DetailJobsPage