'use client'
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import moment from "moment"
import TitleCard from "../ui/TitleCards"
import { formatterJPY } from "@/lib/utils"
import Link from "next/link"
import Loading from "@/app/(dashboard)/loading"

const TopSideButtons= () =>{
    const {data:session} =  useSession()

    if (session?.user.role !== 'STUDENT' && session?.user.role !== 'SENSEI') {
        return(
            <div className="inline-block float-right">
                <Link href="/jobs-application/create" className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" >Tambah Lamaran</Link>
            </div>
        )
    }
   return
}


export default function ApplicationPage() {
    const [values,setValues] = useState([])
    const [loading, setLoading] = useState(true)

    const getJobs = async () => {
        try {  
            const res = await axios.get('/api/jobs-application');
            console.log(res.data)
            setValues(res.data)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
    getJobs();
    }, []);

    if (loading) return <Loading />
    return (
        <TitleCard title={"Data Lamaran"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>} >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Nama</th>
                        <th>Jenis Kelamin</th>
                        <th>Usia</th>
                        <th>Lembaga</th>
                        <th>Perusahaan</th>
                        <th>Jenis Pekerjaan</th>
                        <th>Keberangkatan</th>
                        <th>Keterangan</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            values.map((value,index) =>{
                                return (
                                    <tr key={value.id} className="text-grey ">
                                        <td>{index+1}</td>
                                        <td>{value.student.name}</td>
                                        <td>{value.student.gender}</td>
                                        <td>{value.student.age}</td>
                                        <td>{value.partner.name}</td>
                                        <td>{value.job.company.name}</td>
                                        <td>{value.job.fieldJob}</td>
                                        <td>{moment(value.job.departure).format("DD MMM yyyy")}</td>
                                        <td>{value.status}</td>
                                        <td className="flex flex-col gap-2 items-start">
                                            <Link href={`/jobs/detail/${value.id}`} className="badge badge-success w-16 text-white font-normal">Detail</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

