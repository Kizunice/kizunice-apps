'use client'
import { useState,useEffect, useCallback } from "react"
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
    const {data:session} =  useSession()
    const [values,setValues] = useState([])
    const [jobValues,setJobValues] = useState([])
    const [notjobValues,setNotJobValues] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredList, setFilteredList] = useState('');
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [index, setIndex] = useState(0)

    const getJobs = async () => {
        try {  
            const res = await axios.get('/api/jobs-application');
            setValues(res.data)
            setJobValues(res.data.filter((data) => data.status === "Diterima"))
            setNotJobValues(res.data.filter((data) => data.status === "Ditolak"))
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
    getJobs();
    }, []);

    const searchHandler = useCallback(() => {
        if(values) {
            let filterJob = []
            switch (index) {
                case 0 : filterJob.push(values)
                case 1 : filterJob.push(jobValues)
                case 2 : filterJob.push(notjobValues)
            }
            const filteredData = filterJob[0].filter((value) => {
                return value.student.name.toLowerCase().includes(query.toLowerCase()) ||
                    value.student.asalLPK.toLowerCase().includes(query.toLowerCase()) ||
                    value.partner.name.toLowerCase().includes(query.toLowerCase()) ||
                    value.job.company.name.toLowerCase().includes(query.toLowerCase()) ||
                    value.job.fieldJob.toLowerCase().includes(query.toLowerCase()) ||
                    value.status.toLowerCase().includes(query.toLowerCase()) ||
                    value.note.toLowerCase().includes(query.toLowerCase())
            })
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            const paginatedList = filteredData.slice(firstPageIndex, lastPageIndex);
            setFilteredList(paginatedList)
        }
    }, [values, query, currentPage, index])
    
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
    };

    const handleDelete = async (value) => {
        const approval = confirm("Apakah kamu yakin ingin menghapus?")
        if (approval) {
            await fetch(`/api/jobs-application/${value}`, { method: "DELETE" });
            location.reload()
        }
    }
    
    const FilterJob = () => {
        return(
            <div className="flex flex-col justify-center items-center mb-6 ">
                <ul className="menu menu-vertical lg:menu-horizontal bg-secondary rounded-md text-white">
                    <li className="px-4 py-2">Filter Data</li>
                    <li className={`${index === 0 ? "bg-primary" : "bg-secondary"} rounded-sm transition ease-in-out delay-150 `}>
                        <button onClick={() => {setIndex(0)}}  >
                            Semua Data
                            <span>({values.length} Siswa)</span>
                        </button>
                    </li>
                    <li className={`${index === 1 ? "bg-primary" : "bg-secondary"} rounded-sm transition ease-in-out delay-150 `}>
                        <button onClick={() => {setIndex(1)}}  >
                            Diterima  
                            <span>({jobValues.length} Siswa)</span>
                        </button>
                    </li>
                    <li className={`${index === 2 ? "bg-primary" : "bg-secondary"} rounded-sm transition ease-in-out delay-150 `}>
                        <button onClick={() => {setIndex(2)}}  >
                            Ditolak 
                            <span>({notjobValues.length} Siswa)</span>
                        </button>
                    </li>
                </ul>
            </div>
        )
    }

    const Action = ({value}) => {
        if (session?.user.role === "ADMIN" || session?.user.role === "DOCUMENT") {
            return (
                <div className="flex flex-row items-start">

                    <div className="tooltip" data-tip="Detil Job">
                        <Link href={`/jobs/detail/${value.job.id}`}>
                            <RiEyeFill 
                                className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                            />
                        </Link>
                    </div>
                    <div className="tooltip" data-tip="Ubah Data">
                        <Link href={`/jobs-application/edit/${value.id}`}>
                            <RiFileEditFill 
                                className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                            />
                        </Link> 
                    </div>
                    <div className="tooltip" data-tip="Hapus Data">
                        <RiDeleteBin5Fill 
                            onClick={() => handleDelete(value.id)} 
                            className="text-primary cursor-pointer p-1 text-3xl"
                        />
                    </div>
                </div>
            )
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
            <FilterJob />
            <div className="overflow-x-auto lg:overflow-hidden w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-secondary text-[14px]">
                        <th></th>
                        <th>Nama</th>
                        <th>Asal LPK</th>
                        <th>Jenis<br/> Kelamin</th>
                        <th>Usia</th>
                        <th>Lembaga</th>
                        <th>Perusahaan</th>
                        <th>Pekerjaan</th>
                        <th>Berangkat</th>
                        <th>Status</th>
                        <th>Keterangan</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            filteredList ? filteredList.map((value,index) =>{
                                return (
                                    <tr key={value.id} className="text-grey">
                                        <td>{index+1}</td>
                                        <td className="hover:text-white hover:bg-primary">
                                            <div className="tooltip" data-tip="Lihat Profil" >
                                                <Link href={`/data-student/detail/${value.student.id}`} >
                                                    {value.student.name}
                                                </Link>
                                            </div>
                                        </td>
                                        <td>{value.student.asalLPK}</td>
                                        <td>{value.student.gender}</td>
                                        <td>{value.student.age}</td>
                                        <td>{value.partner.name}</td>
                                        <td>{value.job.company.name}</td>
                                        <td>{value.job.fieldJob}</td>
                                        <td>{moment(value.job.departure).format("DD/MM/YYYY")}</td>
                                        <td className="font-bold">{value.status}</td>
                                        <td>{value.note}</td>
                                        <td > {<Action value={value} />} </td>
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

