'use client'
import { useState , useEffect, useCallback} from 'react';
import { useSession } from 'next-auth/react'
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import 'moment/locale/ja';
import Datepicker from 'react-tailwindcss-datepicker';
import TitleCard from '@/components/ui/TitleCards';
import toast from "react-hot-toast";
import Loading from '@/app/(dashboard)/loading';
import Pagination from '../ui/Pagination';
import { RiCheckboxCircleFill, RiCloseCircleFill  } from 'react-icons/ri';

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
    const [filteredList, setFilteredList] = useState('');
    const [dateFilter, setDateFilter] = useState({
        startDate: null,
        endDate: null,
    });

    const searchHandler = useCallback(() => {
        if (values) {
            const filteredData = values.filter((value) => {
                let filterPass = true
                const date = moment(value.date).format("YYYY-MM-DD")
                if (dateFilter.startDate) {
                    filterPass = filterPass && dateFilter.startDate <= date
                }
                if (dateFilter.endDate) {
                    filterPass = filterPass && dateFilter.endDate >= date
                }
                return filterPass
            })
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            const paginatedList = filteredData.slice(firstPageIndex, lastPageIndex);
            setFilteredList(paginatedList)
        }
    }, [currentPage, values, dateFilter])

    useEffect(() => {
        const timer = setTimeout(() => {
            searchHandler()
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [searchHandler])

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

    const handleValueChange = (newValue) => {
        console.log('newValue:', newValue);
        setDateFilter(newValue);
    };

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

    const DatePicker = () => {
        return (
            <div className="border rounded-lg">
                <Datepicker
                    placeholder={'Pilih Tanggal'}
                    showShortcuts={true}
                    showFooter={true}
                    configs={{
                        shortcuts: {
                            today: "Hari Ini", 
                            yesterday: "Kemarin", 
                            currentMonth: "Bulan Ini", 
                            pastMonth: "Bulan Kemarin",
                        },
                    }} 
                    primaryColor={"blue"} 
                    value={dateFilter}
                    onChange={handleValueChange}
                />
            </div>
        )
    }

    if (loading) return <Loading />

    return (
        <TitleCard 
            title={"Laporan Kehadiran"} 
            topMargin="mt-2" 
            TopMiddleButtons={<DatePicker />}
            TopSideButtons={<TopSideButtons/>}
        >
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
                        <th>Verifikasi<br/> Sensei</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            filteredList ? filteredList.map((value,index) =>{
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
