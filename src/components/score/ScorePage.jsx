'use client'
import { useState, useEffect , useCallback} from "react";
import moment from "moment";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loading from '@/app/(dashboard)/loading';
import SearchButton from "../ui/SearchButton";
import Pagination from "../ui/Pagination";
import { RiFileEditFill } from "react-icons/ri";

let PageSize = 10

const TopSideButtons = () => {
    const {data:session} =  useSession()
    if (session?.user.role !== 'STUDENT' && 'PARTNER') {
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

    const getScoresData = async () => {
        try {  
            const res = await axios.get('/api/score');
            const data = res.data
            console.log(data)
            setValues(data)
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
        const filteredData = values.filter((value) => {
            return value.student.name.toLowerCase().includes(query.toLowerCase()) ||
            value.learning.part.toLowerCase().includes(query.toLowerCase()) ||
            value.grade.toLowerCase().includes(query.toLowerCase())
        })
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const paginatedList = filteredData.slice(firstPageIndex, lastPageIndex);
        setFilteredList(paginatedList)
    }, [values, query])
    
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

    if (loading) return <Loading />
    if(filteredList) {
        return (
          <TitleCard 
                title="Data Nilai Siswa" 
                topMargin="mt-2" 
                TopMiddleButtons={<SearchButton handleChange={handleChange} value={query} placeholder={"Cari Nilai Siswa"} />}
                TopSideButtons={<TopSideButtons/>} >
                <div className="overflow-x-auto lg:overflow-hidden w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-primary text-[14px]">
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Nama Siswa</th>
                            <th>Materi</th>
                            <th>Grade</th>
                            <th>Rata-rata</th>
                            <th>Bunpou</th>
                            <th>Choukai</th>
                            <th>Kanji</th>
                            <th>Kaiwa</th>
                            <th>Bunka</th>
                            <th>Aisatsu</th>
                            {/* <th>Push Up</th>
                            <th>Sit Up</th>
                            <th>Barbel</th> */}
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                filteredList.map((value,idx) =>{
                                    return (
                                        <tr key={idx} className="text-grey ">
                                            <td>{idx+1}</td>
                                            <td>{moment(value.learning.date).format("DD/MM/YY")}</td>
                                            <td>{value.student.name}</td>
                                            <td>{value.learning.part}</td>
                                            <td>{value.grade}</td>
                                            <td>{value.scoreAvg}</td>
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
                                                <div className="lg:tooltip" data-tip="Ubah Nilai">
                                                    <Link href={`/score/edit/${value.id}`}>
                                                        <RiFileEditFill 
                                                            className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                                                        />
                                                    </Link>
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
                        totalCount={values.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </TitleCard>
        );
    }
}
