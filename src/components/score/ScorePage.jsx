'use client'
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loading from '@/app/(dashboard)/loading';


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

export default async function ScorePage() {
    const {data:session} =  useSession()
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(true)

    const getLearningData = async () => {
        try {  
            const res = await axios.get('/api/learning');
            const data = res.data
            const filteredData = data.filter((x => x.scores.length !== 0 ))
            setValues(filteredData)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
    getLearningData();
    }, []);

    if (loading) return <Loading />
    return (
        <TitleCard title={"Data Nilai Siswa"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>} >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Judul</th>
                        <th>Bagian</th>
                        <th>Deskripsi</th>                    
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            values.map((value, index) =>{
                                return (
                                    <tr key={value.id} className="text-grey ">
                                        <td>{index+1}</td>
                                        <td>{moment(value.date).format('DD/MM/YYYY')}</td>
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
    );
}
