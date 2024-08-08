'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect,useState, useCallback } from "react";
import TitleCard from "../ui/TitleCards";
import InputField from "../ui/InputField";
import moment from "moment";
import Link from "next/link";
import Loading from "@/app/(dashboard)/loading"


const TopMiddleButtons = ({handleChange, value}) => {
    const {data:session} =  useSession()
   
    if (session?.user.role === 'ADMIN'|| session?.user.role === 'FINANCE') {
        return(
            <div className="justify-center">
                <InputField
                    type="text"
                    value={value}
                    placeholder="Search..."
                    name="value"
                    onChange={handleChange}
                />
            </div>
        )
    }
   return
}

export default function StudentPage() {
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([])
    const [filteredList, setFilteredList] = useState('');

    const getUsers = async () => {
        try {  
            const res = await axios.get('/api/profile');
            console.log(res.data)
            setUsers(res.data)
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
        console.log(query)
    }

    const searchHandler = useCallback(() => {
        const filteredData = users.filter((user) => {
          return user.name.toLowerCase().includes(query.toLowerCase())
        })
        setFilteredList(filteredData)
        setLoading(false);
      }, [users, query])
    
      useEffect(() => {
        const timer = setTimeout(() => {
          searchHandler()
        }, 500)
    
        return () => {
          clearTimeout(timer)
        }
      }, [searchHandler])

    if (loading) return <Loading />
    if (filteredList) {
        return (
            <TitleCard 
                title={"Data Student"} 
                topMargin="mt-2" 
                TopSideButtons={
                    <TopMiddleButtons handleChange={handleChange} value={query} />
                    }  
                >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-primary text-[14px]">
                            <th>No</th>
                            <th>Nama</th>
                            <th>Jenis Kelamin</th>
                            <th>Asal LPK</th>
                            <th>Nomor HP</th>
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
                                            <td>{user.gender}</td>
                                            <td>{user.asalLPK}</td>
                                            <td>{user.phone}</td>
                                            <td className="flex items-center">
                                                <Link href={`/data-student/detail/${user.id}`} className="badge badge-success px-4 text-white font-normal">Detail</Link>
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
