"use client"
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TitleCard from "@/components/ui/TitleCards";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import Loading from "@/app/(dashboard)/loading"
import SearchButton from "../ui/SearchButton";
import { RiEyeFill, RiDeleteBin5Fill } from "react-icons/ri";
const TopSideButtons = () => {
    const {data:session} =  useSession()

    if (session?.user.role === 'ADMIN') {
        return(
            <div className="inline-block float-right">
                <Link href="/data-partner/create" className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" >Tambah Akun Lembaga</Link>
            </div>
        )
    }
   return
}

export default function PartnerPage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('');
    const [filteredList, setFilteredList] = useState('');

    const getPartnerData = async () => {
        try {  
            const res = await axios.get('/api/data/partner');
            setValues(res.data)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
    getPartnerData();
    }, []);

    const searchHandler = useCallback(() => {
        if (values) {
            const filteredData = values.filter((value) => {
                return value.name.toLowerCase().includes(query.toLowerCase())
            })
            setFilteredList(filteredData)
        }
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

    const handleDelete = async (value) => {
        setLoading(true)
        const approval = confirm("Apakah kamu yakin ingin menghapus?")

        if (approval) {
            await fetch("/api/data/partner", {
                method: "DELETE",
                body: JSON.stringify(value),
                headers: {
                  "Content-Type": "application/json",
                },
            })
            toast.success("Berhasil hapus akun lembaga")
            setLoading(false)
            location.reload()
        }
    }


    if (loading) return <Loading />
    if(filteredList) {
        return (
            <TitleCard 
                title={"Data Lembaga"} 
                topMargin="mt-2" 
                TopMiddleButtons={<SearchButton handleChange={handleChange} value={query} placeholder={"Cari Lembaga"} />}
                TopSideButtons={<TopSideButtons />} 
                >
                <div className="overflow-x-auto lg:overflow-hidden w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-secondary text-[14px]">
                            <th>No</th>
                            <th>Nama Lembaga</th>
                            <th>Alamat</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                filteredList.map((user, index) =>{
                                    return (
                                        <tr key={user.id} className="text-grey ">
                                            <td>{index+1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.address}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            {/* <td>{moment(user.createdAt).format('DD-MMM-YYYY')}</td> */}
                                        
                                            <td className="flex items-center">
                                                <div className="tooltip" data-tip="Detil Profile">
                                                    <Link href={`/data-partner/detail/${user.id}`}>
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
            </TitleCard>
        );
    }
}
