'use client'
import { useState,useEffect, useCallback, useMemo } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import moment from "moment"
import TitleCard from "../ui/TitleCards"
import Link from "next/link"
import Loading from "@/app/(dashboard)/loading"
import { RiFileEditFill, RiDeleteBin5Fill, RiEyeFill } from "react-icons/ri"
import SearchButton from "../ui/SearchButton"
import Pagination from "../ui/Pagination"

let PageSize = 5;

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
    const [filteredList, setFilteredList] = useState('');
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

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

    const searchHandler = useMemo(() => {
        if(values) {
            const filteredData = values.filter((value) => {
                return value.student.name.toLowerCase().includes(query.toLowerCase()) ||
                    value.student.asalLPK.toLowerCase().includes(query.toLowerCase()) ||
                    value.partner.name.toLowerCase().includes(query.toLowerCase()) ||
                    value.job.company.name.toLowerCase().includes(query.toLowerCase()) ||
                    value.job.fieldJob.toLowerCase().includes(query.toLowerCase()) 
            })
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            const paginatedList = filteredData.slice(firstPageIndex, lastPageIndex);
            setFilteredList(paginatedList)
        }
        
    }, [values, query, currentPage])
    
    useEffect(() => {
        const timer = setTimeout(() => {
            searchHandler()
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [searchHandler])

    const handleChange = (e) => {
        e.preventDefault()
        setQuery(e.target.value);
        console.log(query);
    };

    const handleDelete = async (value) => {
        const approval = confirm("Apakah kamu yakin ingin menghapus?")

        if (approval) {
            await fetch(`/api/jobs-application/${value}`, { method: "DELETE" });
            location.reload()
        }
    }

    if (loading) return <Loading />
    return (
        <TitleCard 
            title={"Data Lamaran Kerja"} 
            topMargin="mt-2" 
            TopSideButtons={<TopSideButtons/>} 
            TopMiddleButtons={<SearchButton handleChange={handleChange} value={query} placeholder={"Cari Data Pelamar"} />}
            
            >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th></th>
                        <th>Nama</th>
                        <th>Asal LPK</th>
                        <th>Jenis Kelamin</th>
                        <th>Usia</th>
                        <th>Lembaga</th>
                        <th>Perusahaan</th>
                        <th>Pekerjaan</th>
                        <th>Berangkat</th>
                        <th>Keterangan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            filteredList ? filteredList.map((value,index) =>{
                                return (
                                    <tr key={value.id} className="text-grey ">
                                        <td>{index+1}</td>
                                        <td>{value.student.name}</td>
                                        <td>{value.student.asalLPK}</td>
                                        <td>{value.student.gender}</td>
                                        <td>{value.student.age}</td>
                                        <td>{value.partner.name}</td>
                                        <td>{value.job.company.name}</td>
                                        <td>{value.job.fieldJob}</td>
                                        <td>{moment(value.job.departure).format("DD/MM/yyyy")}</td>
                                        <td>{value.note}</td>
                                        <td>{value.status ? "Diterima" : "Belum Diterima"}</td>
                                        <td className="flex flex-row items-start">
                                            <Link href={`/jobs/detail/${value.job.id}`}>
                                                <RiEyeFill 
                                                    className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                                                />
                                            </Link>
                                            <Link href={`/jobs-application/edit/${value.id}`}>
                                                <RiFileEditFill 
                                                    className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                                                />
                                            </Link>
                                            <RiDeleteBin5Fill 
                                                onClick={() => handleDelete(value.id)} 
                                                className="text-primary cursor-pointer p-1 text-3xl"
                                            />
                                        </td>
                                    </tr>
                                )
                            }) : ""
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center mt-4">
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={values.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </TitleCard>
    )
}

