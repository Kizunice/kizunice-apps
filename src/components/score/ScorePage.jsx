'use client'
import { useState, useEffect , useCallback} from "react";
import moment from "moment";
import 'moment/locale/ja';
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loading from '@/app/(dashboard)/loading';
import SearchButton from "../ui/SearchButton";
import Pagination from "../ui/Pagination";
import { RiLink, RiFileEditFill, RiDeleteBin5Fill } from "react-icons/ri";

let PageSize = 10

const TopSideButtons = () => {
    const {data:session} =  useSession()
    if (session?.user.role === 'SENSEI') {
        return(
            <div className="inline-block float-right">
                <Link href="/score/create" className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" >Tambah Nilai</Link>
            </div>
        )
    }
   return
}

export default function ScorePage() {
    const {data:session} =  useSession()
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredList, setFilteredList] = useState('');
    const [index, setIndex] = useState(0)
    const [gradeA, setGradeA] = useState([])
    const [gradeB, setGradeB] = useState([])
    const [gradeC, setGradeC] = useState([])
    const [gradeD, setGradeD] = useState([])
    const [gradeE, setGradeE] = useState([])

    const getScoresData = async () => {
        setLoading(true)
        try {  
            const res = await axios.get('/api/score');
            if (res) {
                setValues(res.data.scores)
                setGradeA(res.data.gradeA)
                setGradeB(res.data.gradeB)
                setGradeC(res.data.gradeC)
                setGradeD(res.data.gradeD)
                setGradeE(res.data.gradeE)
                setLoading(false)
            }
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
        getScoresData();
    }, []);

    const searchHandler = useCallback(() => {
        let filterJob = []
        switch (index) {
            case 0 :  filterJob.push(values)
            case 1 :  filterJob.push(gradeA)
            case 2 :  filterJob.push(gradeB)
            case 3 :  filterJob.push(gradeC)
            case 4 :  filterJob.push(gradeD)
            case 5 :  filterJob.push(gradeE)
        }
        const filteredData = filterJob[0].filter((value) => {
            return value.student.name.toLowerCase().includes(query.toLowerCase()) ||
            value.learning.part.toLowerCase().includes(query.toLowerCase()) ||
            value.grade.toLowerCase().includes(query.toLowerCase())
        })
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const paginatedList = filteredData.slice(firstPageIndex, lastPageIndex);
        setFilteredList(paginatedList)
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
            await fetch(`/api/score/${value}`, { method: "DELETE" });
            location.reload()
        }
    }

    const FilterJob = () => {
        return(
            <div className="flex flex-col justify-center items-center mb-6 ">
                <ul className="menu menu-vertical lg:menu-horizontal bg-secondary rounded-md text-white">
                    <li className="px-4 py-2">Grade</li>
                    <li className={`${index === 0 ? "bg-primary" : "bg-secondary"} rounded-sm`}>
                        <button onClick={() => {setIndex(0)}}  >
                            Semua
                        </button>
                    </li>
                    <li className={`${index === 1 ? "bg-primary" : "bg-secondary"} rounded-sm`}>
                        <button onClick={() => {setIndex(1)}}  >
                            A
                        </button>
                    </li>
                    <li className={`${index === 2 ? "bg-primary" : "bg-secondary"} rounded-sm`}>
                        <button onClick={() => {setIndex(2)}}  >
                            B
                        </button>
                    </li>
                    <li className={`${index === 3 ? "bg-primary" : "bg-secondary"} rounded-sm`}>
                        <button onClick={() => {setIndex(3)}}  >
                            C
                        </button>
                    </li>
                    <li className={`${index === 4 ? "bg-primary" : "bg-secondary"} rounded-sm`}>
                        <button onClick={() => {setIndex(4)}}  >
                            D
                        </button>
                    </li>
                    <li className={`${index === 5 ? "bg-primary" : "bg-secondary"} rounded-sm`}>
                        <button onClick={() => {setIndex(5)}}  >
                            E
                        </button>
                    </li>
                </ul>
            </div>
        )
    }

    if (loading) return <Loading />
    if(filteredList) {
        return (
          <TitleCard 
                title="Laporan Nilai" 
                topMargin="mt-2" 
                TopMiddleButtons={<SearchButton handleChange={handleChange} value={query} placeholder={"Cari Nilai Siswa"} />}
                TopSideButtons={<TopSideButtons/>} >
                <FilterJob />
                <div className="overflow-x-auto lg:overflow-hidden w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-secondary text-[14px]">
                            <th>Tanggal</th>
                            <th>Nama Sensei</th>
                            <th>Nama Siswa</th>
                            <th>Bab</th>
                            <th>Grade</th>
                            <th>Rata-<br/>rata</th>
                            <th>Bunpou</th>
                            <th>Choukai</th>
                            <th>Kanji</th>
                            <th>Kaiwa</th>
                            <th>Bunka</th>
                            <th>Aisatsu</th>
                            <th>Link</th>
                            {/* <th>Push Up</th>
                            <th>Sit Up</th>
                            <th>Barbel</th> */}
                        </tr>
                        </thead>
                        <tbody>
                            {
                                filteredList.map((value,idx) =>{
                                    return (
                                        <tr key={idx} className="text-grey ">
                                            <td>{moment(value.learning.date).format("ll")}</td>
                                            <td>{value.sensei.name}</td>
                                            <td>{value.student.name}</td>
                                            <td>{value.learning.part}</td>
                                            <td className="font-bold">{value.grade}</td>
                                            <td className="font-bold">{value.scoreAvg}</td>
                                            <td>{value.bunpou}</td>
                                            <td>{value.choukai}</td>
                                            <td>{value.kanji}</td>
                                            <td>{value.kaiwa}</td>
                                            <td>{value.bunka}</td>
                                            <td>{value.aisatsu}</td>
                                            {/* <td>{value.pushUp}</td>
                                            <td>{value.sitUp}</td>
                                            <td>{value.barbel}</td> */}
                                            <td>
                                                { value.linkFile ? (
                                                    <div className="tooltip" data-tip="Link File">
                                                        <Link href={value.linkFile} target="_blank">
                                                            <RiLink className="text-secondary cursor-pointer p-1 text-3xl"/>
                                                        </Link>
                                                    </div>
                                                    ): null
                                                }
                                            </td>
                                            <td>
                                                {session?.user.role === 'SENSEI' ?
                                                (
                                                    <div className="flex flex-row items-start">
                                                        <div className="tooltip" data-tip="Ubah Data">
                                                            <Link href={`/score/edit/${value.id}`}>
                                                                <RiFileEditFill 
                                                                    className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="tooltip" data-tip="Ubah Data">
                                                            <RiDeleteBin5Fill 
                                                                onClick={() => handleDelete(value.id)} 
                                                                className="text-danger cursor-pointer p-1 text-3xl"
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                                : ""}
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
                        totalCount={values.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </TitleCard>
        );
    }
}
