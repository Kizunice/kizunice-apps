'use client'
import { useState,useEffect,useCallback } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import moment from "moment"
import TitleCard from "../ui/TitleCards"
import { formatterJPY } from "@/lib/utils"
import Link from "next/link"
import SearchButton from "../ui/SearchButton"
import Loading from "@/app/(dashboard)/loading"
import { RiDeleteBin5Fill, RiEyeFill, RiFileEditFill  } from "react-icons/ri";

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
    const {data:session} =  useSession()
    const [values,setValues] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredList, setFilteredList] = useState('');
    const [query, setQuery] = useState('');

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

    const handleChange = (e) => {
        e.preventDefault()
        setQuery(e.target.value)
        console.log(query)
    }

    const searchHandler = useCallback(() => {
        const filteredData = values.filter((value) => {
          return value.supervisor.name.toLowerCase().includes(query.toLowerCase()) ||
          value.location.toLowerCase().includes(query.toLowerCase()) ||
          value.title.toLowerCase().includes(query.toLowerCase()) ||
          value.fieldJob.toLowerCase().includes(query.toLowerCase()) 
        })
        setFilteredList(filteredData)
        setLoading(false);
      }, [values, query])
    
      useEffect(() => {
        const timer = setTimeout(() => {
          searchHandler()
        }, 500)
    
        return () => {
          clearTimeout(timer)
        }
      }, [searchHandler])

    if (loading) return <Loading />
    if(filteredList) {
        return (
            <TitleCard 
                title={"Data Program Kerja"} 
                topMargin="mt-2" 
                TopMiddleButtons={<SearchButton handleChange={handleChange} value={query} placeholder={"Cari kumiai"} />} 
                TopSideButtons={<TopSideButtons/>} 
            >
                <div className="overflow-x-auto lg:overflow-hidden w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-primary text-[14px]">
                            <th></th>
                            <th>Program</th>
                            <th>Kumiai</th>
                            <th>Lokasi</th>
                            <th>Bidang</th>
                            <th>Jenis Kelamin</th>
                            <th>Pekerja</th>
                            <th>Gaji</th>
                            <th>Berangkat</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                filteredList.map((value,index) =>{
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
                                            <td className="flex flex-row items-start">
                                                <div className="lg:tooltip" data-tip="Lihat Data">
                                                    <Link href={`/jobs/detail/${value.id}`}>
                                                        <RiEyeFill 
                                                            className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                                                        />
                                                    </Link>
                                                </div>
                                                {
                                                    session?.user.role === "STUDENT" ? "" : (
                                                        <>
                                                        <div className="lg:tooltip" data-tip="Ubah Data">
                                                            <Link href={`/jobs/edit/${value.id}`}>
                                                                <RiFileEditFill 
                                                                    className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="lg:tooltip" data-tip="Hapus Data">
                                                            <RiDeleteBin5Fill 
                                                                onClick={() => handleDelete(value.id)} 
                                                                className="text-primary cursor-pointer p-1 text-3xl"
                                                            />
                                                        </div>
                                                        </>
                                                    ) 
                                                }
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
}

