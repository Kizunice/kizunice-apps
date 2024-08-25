'use client'
import axios from "axios";
import { useEffect,useState, useCallback } from "react";
import TitleCard from "../ui/TitleCards";
import Link from "next/link";
import Loading from "@/app/(dashboard)/loading"
import SearchButton from "../ui/SearchButton";
import Pagination from "../ui/Pagination";
import { RiEyeFill, RiDeleteBin5Fill } from "react-icons/ri";
let PageSize = 10;

export default function StudentPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])
    const [job, setJob] = useState([])
    const [notJob, setNotJob] = useState([])
    const [notMensetsu, setNotMensetsu] = useState([])
    const [query, setQuery] = useState('');
    const [filteredList, setFilteredList] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [index, setIndex] = useState(0)

    const getUsers = async () => {
        try {  
            const res = await axios.get('/api/profile');
            setUsers(res.data)
            setJob(res.data.filter((data) => data.isHired === true))
            setNotJob(res.data.filter((data) => data.isHired === false))
            setNotMensetsu(res.data.filter((data) => data.jobApplications <= 0))
            setLoading(false);
        } catch (err) {
          console.log("[collections_GET]", err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleChange = (e) => {
        e.preventDefault()
        setQuery(e.target.value)
    }
   
    const searchHandler = useCallback(() => {
        let filterJob = []
        if (index === 0) {
            filterJob.push(users)
        } else if (index === 1) {
            filterJob.push(job)
        } else  if (index === 2) {
            filterJob.push(notJob)
        } else  if (index === 3) {
            filterJob.push(notMensetsu)
        }
        const filteredData = filterJob[0].filter((user) => {
          return user.name.toLowerCase().includes(query.toLowerCase()) ||
           user.asalLPK.toLowerCase().includes(query.toLowerCase())
        })

        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const paginatedList = filteredData.slice(firstPageIndex, lastPageIndex);
        setFilteredList(paginatedList)
        setLoading(false);
      }, [users, query, currentPage, index])
    
      useEffect(() => {
        const timer = setTimeout(() => {
          searchHandler()
        }, 500)
    
        return () => {
          clearTimeout(timer)
        }
      }, [searchHandler])

    const FilterJob = () => {
        return(
            <div className="flex flex-col justify-center items-center">
                <ul className="menu menu-vertical lg:menu-horizontal bg-secondary rounded-md text-white">
                    <li className={`${index === 0 ? "bg-primary" : "bg-secondary"} rounded-sm`}>
                        <button onClick={() => {setIndex(0)}}  >
                            Semua Siswa
                            <span>({users.length})</span>
                        </button>
                    </li>
                    <li className={`${index === 1 ? "bg-primary" : "bg-secondary"} rounded-sm`}>
                        <button onClick={() => {setIndex(1)}}  >
                            Sudah dapat Job 
                            <span>({job.length})</span>
                        </button>
                    </li>
                    <li className={`${index === 2 ? "bg-primary" : "bg-secondary"} rounded-sm`}>
                        <button onClick={() => {setIndex(2)}}  >
                            Belum dapat Job 
                            <span>({notJob.length})</span>
                        </button>
                    </li>
                    <li className={`${index === 3 ? "bg-primary" : "bg-secondary"} rounded-sm`}>
                        <button onClick={() => {setIndex(3)}}  >
                            Belum Mensetsu
                            <span>({notMensetsu.length})</span>
                        </button>
                    </li>
                </ul>
            </div>
        )
    }           

    const handleDelete = async (value) => {
        const approval = confirm("Apakah kamu yakin ingin menghapus?")
        if (approval) {
            await fetch(`/api/data/student/${value}`, { method: "DELETE" });
            location.reload()
        }
    }
    
    if (loading) return <Loading />
    if (filteredList) {
        return (
            <TitleCard 
                title={"Data Siswa"} 
                topMargin="mt-2" 
                TopMiddleButtons={<FilterJob />}
                TopSideButtons={<SearchButton handleChange={handleChange} value={query} placeholder={"Cari Siswa"} />}  
                >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-secondarys text-[14px]">
                            <th>No</th>
                            <th>Nama</th>
                            <th>Asal LPK</th>
                            <th>Jenis Kelamin</th>
                            <th>Nomor HP</th>
                            <th>Job</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {   
                               filteredList.map((user,index) =>{
                                    return (
                                        <tr key={user.id} className="text-grey ">
                                            <td>{index+1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.asalLPK}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.isHired ? 
                                                    <span className="badge badge-success px-4 text-white font-normal">Sudah</span>
                                                    :  <span className="badge badge-error px-4 text-white font-normal">Belum</span>}
                                            </td>
                                            <td className="flex items-center">
                                                <div className="tooltip" data-tip="Detil Profile">
                                                    <Link href={`/data-student/detail/${user.id}`}>
                                                        <RiEyeFill 
                                                            className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="tooltip" data-tip="Hapus Akun">
                                                    <RiDeleteBin5Fill 
                                                        onClick={() => handleDelete(user.id)} 
                                                        className="text-error cursor-pointer p-1 text-3xl"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center mt-4">
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={users.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
            </TitleCard>
        );
    }
}
