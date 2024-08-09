'use client'
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import moment from "moment"
import TitleCard from "../ui/TitleCards"
import { formatterJPY } from "@/lib/utils"
import Link from "next/link"
import Loading from "@/app/(dashboard)/loading"
import { RiDeleteBin5Fill, RiEdit2Fill, RiFileEditFill  } from "react-icons/ri";

const TopSideButtons= () =>{
    const {data:session} =  useSession()

    if (session?.user.role !== 'STUDENT' && session?.user.role !== 'SENSEI') {
        return(
            <div className="inline-block float-right">
                <Link href="/jobs/create" className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" >Tambah Pekerjaan</Link>
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

    const handleDelete = async (value) => {
        const approval = confirm("Apakah kamu yakin ingin menghapus?")

        if (approval) {
            await fetch(`/api/data/partner/${value}`, { method: "DELETE" });
            location.reload()
        }
    }

    if (loading) return <Loading />
    return (
        <TitleCard title={"Data Lowongan Kerja"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>} >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Program</th>
                        <th>Kumiai</th>
                        <th>Lokasi</th>
                        <th>Bidang</th>
                        <th>Jenis Kelamin</th>
                        <th>Pekerja</th>
                        <th>Gaji</th>
                        <th>Keberangkatan</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            values.map((value,index) =>{
                                return (
                                    <tr key={value.id} className="text-grey ">
                                        <td>{index+1}</td>
                                        <td>{value.title}</td>
                                        <td>{value.supervisor.name}</td>
                                        <td>{value.location}</td>
                                        <td>{value.fieldJob}</td>
                                        <td>{value.gender}</td>
                                        <td>{value.needs}</td>
                                        <td>{formatterJPY(value.salary)}</td>
                                        <td>{moment(value.departure).format("DD/MM/yyyy")}</td>
                                        <td className="flex flex-row gap-1 items-start">
                                            <Link href={`/jobs/detail/${value.id}`}>
                                                <RiFileEditFill 
                                                    className="hover:text-primary cursor-pointer p-1 text-3xl"
                                                    data-tip="Hapus Data"
                                                />
                                            </Link>
                                            <RiDeleteBin5Fill 
                                                onClick={() => handleDelete(value.id)} 
                                                className="hover:text-primary cursor-pointer p-1 text-3xl"
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
    )
}

