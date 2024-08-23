"use client"
import { useEffect, useState, useCallback} from "react";
import { useSession } from "next-auth/react";
import TitleCard from "@/components/ui/TitleCards";
import moment from "moment";
import Link from "next/link";
import axios from "axios";
import Loading from "@/app/(dashboard)/loading"
import SearchButton from "../ui/SearchButton";
import { RiDeleteBin5Fill, RiEyeFill } from "react-icons/ri";
const TopSideButtons = () => {
    const {data:session} =  useSession()

    if (session?.user.role === 'ADMIN') {
        return(
            <div className="inline-block float-right">
                <Link href="/data-sensei/create" className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" >Tambah Akun Sensei</Link>
            </div>
        )
    }
   return
}

export default function SenseiPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('');
    const [filteredList, setFilteredList] = useState('');

    const getUsers = async () => {
        try {  
          const res = await axios.get('/api/profile/sensei');
          setUsers(res.data)
          console.log(res.data)
          setLoading(false);
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false);
        }
      };

    useEffect(() => {
    getUsers();
    }, []);

    const searchHandler = useCallback(() => {
        const filteredData = users.filter((user) => {
            return user.name.toLowerCase().includes(query.toLowerCase())
        })
        setFilteredList(filteredData)
    }, [users, query])
    
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
    if(filteredList) {
        return (
            <TitleCard 
                title={"Data Sensei"} 
                topMargin="mt-2" 
                TopMiddleButtons={<SearchButton handleChange={handleChange} value={query} placeholder={"Cari Sensei"} />}
                TopSideButtons={<TopSideButtons />} 
                >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-secondary text-[14px]">
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Join Date</th>
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
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{moment(user.createdAt).format('DD-MMM-YYYY')}</td>
                                        
                                            <td className="flex items-center">
                                                <div className="tooltip" data-tip="Detil Profile">
                                                    <Link href={`/profile/${user.id}`}>
                                                        <RiEyeFill 
                                                            className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="tooltip" data-tip="Hapus Akun">
                                                    <RiDeleteBin5Fill 
                                                        onClick={() => handleDelete(value.id)} 
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
