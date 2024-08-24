'use client'
import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from '@/app/(dashboard)/loading';
import { RiFileEditFill, RiEyeFill, RiDeleteBin5Fill, RiLink} from "react-icons/ri";
import SearchButton from "../ui/SearchButton";
import Pagination from "../ui/Pagination"
let PageSize = 10;

const TopSideButtons = () => {
    const {data:session} =  useSession()

    if (session?.user.role !== 'STUDENT' && session?.user.role !== 'PARTNER' && session?.user.role !== 'ADMIN' ) {
        return(
            <div className="inline-block float-right">
                <Link href="/learning/create" className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" >Tambah Baru</Link>
            </div>
        )
    }
   return
}

export default function LearningPage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('');
    const [filteredList, setFilteredList] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const getLearningData = async () => {
        try {  
            const res = await axios.get('/api/learning');
            console.log(res.data)
            setValues(res.data)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
    getLearningData();
    }, []);

    
    const handleDelete = async (value) => {
        const approval = confirm("Apakah kamu yakin ingin menghapus? Jika menghapus data belajar maka data nilai akan terhapus juga")
        if (approval) {
            await fetch(`/api/learning/${value}`, { method: "DELETE" });
            location.reload()
        }
    }

    const searchHandler = useCallback(() => {
        const filteredData = values.filter((value) => {
            return value.sensei.name.toLowerCase().includes(query.toLowerCase()) ||
            value.part.toString().includes(query.toLowerCase())
        })
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const paginatedList = filteredData.slice(firstPageIndex, lastPageIndex);
        setFilteredList(paginatedList)
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

    if (loading) return <Loading />
    if(filteredList) {
        return (
            <TitleCard 
                title={"Laporan Belajar Siswa"} 
                topMargin="mt-2" 
                TopMiddleButtons={<SearchButton handleChange={handleChange} value={query} placeholder={"Cari Data"} />}
                TopSideButtons={<TopSideButtons/>} 
            >
                <div className="overflow-x-auto lg:overflow-hidden w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-secondary text-[14px]">
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Sensei</th>
                            <th>Bab</th>
                            <th>Judul</th>
                            <th>Deskripsi</th>                    
                            <th>Link</th>                    
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                filteredList ? filteredList.map((value, index) => {
                                    return (
                                        <tr key={value.id} className="text-grey ">
                                            <td>{index+1}</td>
                                            <td>{moment(value.date).format('DD/MM/YYYY')}</td>
                                            <td>{value.sensei.name}</td>
                                            <td>{value.part}</td>
                                            <td>{value.title}</td>
                                            <td>{value.description}</td> 
                                            <td>
                                                { value.fileUrl ? (
                                                    <div className="tooltip" data-tip="Link File">
                                                        <Link href={value.fileUrl} target="_blank">
                                                            <RiLink className="text-secondary cursor-pointer p-1 text-3xl"/>
                                                        </Link>
                                                    </div>
                                                    ): null
                                                }
                                            </td>
                                            <td className="flex flex-row items-start">
                                                <div className="lg:tooltip" data-tip="Detil Data">
                                                    <Link href={`/learning/detail/${value.id}`}>
                                                        <RiEyeFill 
                                                            className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                                                        />
                                                    </Link>
                                                </div>
                                                {session?.user.role == 'SENSEI' ?
                                                    <>
                                                        <div className="lg:tooltip" data-tip="Ubah Data">
                                                            <Link href={`/learning/edit/${value.id}`}>
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
                                                : ""}
                                            </td>
                                        </tr>
                                    )
                                }) : ''   
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
