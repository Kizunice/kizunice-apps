'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";
import TitleCard from "../ui/TitleCards";
import moment from "moment";
import Link from "next/link";

export default async function StudentPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])
    
    const getUsers = async () => {
        try {  
          const res = await axios.get('/api/users/student');
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
        <TitleCard title={"Data Student"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Join Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {   
                            users.map(user =>{
                                return (
                                    <tr key={user.id} className="text-grey ">
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{moment(user.createdAt).format('DD-MMM-YYYY')}</td>
                                    <td className="flex items-center">
                                        <Link href={`/profile/${user.id}`} className="badge badge-success px-4 text-white font-normal">Detail</Link>
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
