"use client"
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TitleCard from "@/components/ui/TitleCards";
import Link from "next/link";
import axios from "axios";
import Loading from "@/app/(dashboard)/loading"
import SearchButton from "../ui/SearchButton";

const TopSideButtons = () => {
    const {data:session} =  useSession()

    if (session?.user.role === 'ADMIN') {
        return(
            <div className="inline-block float-right">
                <Link href="/data-partner/create" className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" >Tambah Akun Rekanan</Link>
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
            const res = await axios.get('/api/profile/partner');
            console.log(res.data)
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
        const filteredData = values.filter((value) => {
            return value.name.toLowerCase().includes(query.toLowerCase())
        })
        setFilteredList(filteredData)
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
        console.log(query);
    };

    if (loading) return <Loading />
    if(filteredList) {
        return (
            <TitleCard 
                title={"Data Lembaga"} 
                topMargin="mt-2" 
                TopMiddleButtons={<SearchButton handleChange={handleChange} value={query} placeholder={"Cari Lembaga"} />}
                TopSideButtons={<TopSideButtons />} 
                >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-primary text-[14px]">
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
                                                <Link href={`/data-partner/detail/${user.id}`} className="badge badge-success px-4 text-white font-normal">Detail</Link>
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
