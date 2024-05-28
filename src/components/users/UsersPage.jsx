'use client'
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import TitleCard from "@/components/ui/TitleCards";
export default async function UsersPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])
    
    const getUsers = async () => {
        try {  
          const res = await axios.get('/api/users');
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
  
    return (
        <TitleCard title={"Data Pengguna"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>Id</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Join Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user =>{
                                return (
                                    <tr key={user.id} className="text-grey ">
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{moment(user.createdAt).format("DD-MM-yyyy")}</td>
                                    <td className="flex items-center">
                                        <Link 
                                            href={`/profile/${user.id}`} 
                                            className="badge badge-success px-4 text-white font-normal"
                                        >
                                            Detail
                                        </Link>
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
