'use client'
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from '@/app/(dashboard)/loading';


const TopSideButtons = () => {
    const {data:session} =  useSession()

    if (session?.user.role !== 'STUDENT') {
        return(
            <div className="inline-block float-right">
                <Link href="/learning/create" className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" >Tambah Baru</Link>
            </div>
        )
    }
   return
}

export default async function LearningPage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(true)

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

    return (
        <>
        {loading ? <Loading /> : (
            <TitleCard title={"Data Pembelajaran"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-primary text-[14px]">
                            <th>Tanggal</th>
                            <th>Sensei</th>
                            <th>Judul</th>
                            <th>Bagian</th>
                            <th>Deskripsi</th>                    
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                values.map(value =>{
                                    return (
                                        <tr key={value.id} className="text-grey ">
                                        <td>{moment(value.date).format('DD-MMM-YYYY')}</td>
                                        <td>{value.senseiName}</td>
                                        <td>{value.title}</td>
                                        <td>{value.part}</td>
                                        <td>{value.description}</td> 
                                        <td className="flex flex-col gap-2 items-start">
                                            <Link href={`/learning/detail/${value.id}`} className="badge badge-success w-16 text-white font-normal">Detail</Link>
                                            {session?.user.role == 'SENSEI' ?
                                                <Link href={`/learning/edit/${value.id}`} className="badge badge-warning w-16 text-white font-normal">Edit</Link>
                                            : <></>}
                                            
                                        </td>
                                        </tr>
                                    )
                                })    
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard> 
        )}
        </>    
    );
}
