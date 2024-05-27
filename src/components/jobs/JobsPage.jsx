'use client'
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import moment from "moment"
import TitleCard from "../ui/TitleCards"
import { formatter } from "@/lib/utils"
import Link from "next/link"
import Loading from "@/app/(dashboard)/loading"

const TopSideButtons=() =>{
    const {data:session} =  useSession()

    if (session?.user.role !== 'STUDENT') {
        return(
            <div className="inline-block float-right">
                <Link href="/jobs/create" className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" >Tambah Lowongan</Link>
            </div>
        )
    }
   return
}


export default function JobsPage() {
    const [values,setValues] = useState([])
    const [loading, setLoading] = useState(true)

    const getJobs = async () => {
        try {  
            const res = await axios.get('/api/jobs');
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

    return (
        <>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DUMMY_JOBS.map((data)=>{
                return (
                    <Link key={data.id} className="hover:border hover:border-primary hover:rounded-xl" href="/jobs/detail/">
                        <TitleCard title={data.title} topMargin="0" TopSideButtons={<div className="text-primary">{formatter.format(data.salary)}</div>} >
                            <div>{data.fieldWork}</div>
                            <div>{data.typeWork}</div>
                            <div className="divider"></div>
                            <div>{data.postedBy.name}</div>
                            <div>{data.postedBy.country}</div>
                            <div>{data.location}</div>
                        </TitleCard>
                    </Link>
                    )   
            })}
        </div> */}
        { loading ? <Loading/> : (
            <TitleCard title={"Data Lowongan Kerja"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-primary text-[14px]">
                            <th>Tanggal</th>
                            <th>Lokasi</th>
                            <th>Title</th>
                            <th>Bidang</th>
                            <th>Jenis Kelamin</th>
                            <th>Gaji</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                values.map((value) =>{
                                    return (
                                        <tr key={value.id} className="text-grey ">
                                        <td>{moment(value.createdAt).format("DD/MM/yyyy")}</td>
                                        <td>{value.location}</td>
                                        <td>{value.title}</td>
                                        <td>{value.fieldJob}</td>
                                        <td>{value.gender}</td>
                                        <td>{formatter.format(value.salary)}</td>
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
        )}
        
        </>
        
            
    )
}

