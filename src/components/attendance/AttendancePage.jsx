'use client'
import { useState , useEffect, useMemo} from 'react';
import { useSession } from 'next-auth/react'
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import 'moment/locale/ja';
import Stats from "@/components/ui/StatsCard";
import TitleCard from '@/components/ui/TitleCards';
import toast from "react-hot-toast";
import Loading from '@/app/(dashboard)/loading';
import Pagination from '../ui/Pagination';
import { IoCalendar } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { HiUsers } from 'react-icons/hi2';
import { RiCheckboxCircleFill, RiCloseCircleFill  } from 'react-icons/ri';

// const statsData = [
//     {title : "Today", value : "150", icon: <IoCalendar size={30}/>, color:"bg-white"},
//     {title : "OnTime", value : "145" , icon: <ImBook size={30}/>, color:"bg-green text-primary"},
//     {title : "Late", value : "5", icon: <HiUsers size={30}/>, color:"bg-red text-primary"},
// ]

const TopSideButtons= () =>{
    const {data:session} =  useSession()
    if (session?.user.role === 'STUDENT') {
        return(
            <div className="inline-block float-right">
                <Link href="/attendance/create" className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" >Tambah Prensensi</Link>
            </div>
        )
    }
   return
}

let PageSize = 10;

export default function AttendancePage() {
    const {data:session} =  useSession()
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedList = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return values.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, values]);

    const getAttendance = async () => {
        try {  
            const res = await axios.get('/api/attendance');
            console.log(res.data)
            setValues(res.data)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
    getAttendance();
    }, []);

    const sign = async (value) => {
        try {
            const response = await fetch("/api/attendance/sign", {
                method: "POST",
                body: JSON.stringify(value),
                headers: {
                "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                toast.success("Berhasil Absen Pulang!");
                location.reload();
            } 
        } catch (error) {
            console.error("Network Error:", error);
        }
    }

    const verif = async (value) => {
        try {
            const response = await fetch("/api/attendance/verif", {
                method: "POST",
                body: JSON.stringify(value),
                headers: {
                "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                toast.success("Berhasil verifikasi kehadiran!");
                location.reload();
            } 
        } catch (error) {
            console.error("Network Error:", error);
        }
    }

    if (loading) return <Loading />

    return (
        <>
            {/* <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-3 grid-cols-1 gap-6 mb-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <Stats key={k} {...d} />
                        )
                    })
                }
            </div> */}
            <TitleCard title={"Daftar Kehadiran Siswa"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-secondary text-[14px]">
                            <th>No</th>
                            <th>Hari</th>
                            <th>Tanggal</th>
                            <th>Nama Siswa</th>
                            <th>Nama Sensei</th>
                            <th>Masuk</th>
                            <th>Pulang</th>
                            <th>Verifikasi Sensei</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                paginatedList.map((value,index) =>{
                                    return (
                                        <tr key={value.id} className="text-grey ">
                                        <td>{index+1}</td>
                                        <td>{moment(value.date).format("dddd")}</td>
                                        <td>{moment(value.date).format("ll")}</td>
                                        <td>{value.name}</td>
                                        <td>{value.sensei.name}</td>
                                        <td>{moment(value.signInTime).format("hh:mm")}</td>
                                        <td>{session?.user.role=== 'STUDENT' ? 
                                                value.signOut ? moment(value.signOutTime).format("hh:mm") : <button className='bg-error px-4 py-1 rounded-md text-white' onClick={() => sign(value.id)}> Absen </button> : 
                                                value.signOut ? moment(value.signOutTime).format("hh:mm") : <div className='text-error'>Belum absen</div> }
                                        </td>
                                        <td>
                                            {
                                                session?.user.role=== 'SENSEI' ? 
                                                    value.accepted ? 
                                                    <RiCheckboxCircleFill size={24} className='text-success' /> : 
                                                    <button className='bg-primary px-4 py-1 rounded-md text-white' onClick={() => verif(value.id)}> Absen </button>
                                                : value.accepted ? 
                                                <RiCheckboxCircleFill size={20} className='text-success' /> :
                                                <RiCloseCircleFill size={20} className='text-error' />
                                            }
                                        </td>
                                        <td>{value.status}</td>
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
        </>
    );
}
