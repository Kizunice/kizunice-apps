'use client'
import { useState , useEffect, useMemo} from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ja';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { IoCalendar } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { HiUsers } from 'react-icons/hi2';
import Stats from "@/components/ui/StatsCard";
import TitleCard from '@/components/ui/TitleCards';
import InputField from "../ui/InputField";
import toast from "react-hot-toast";
import Loading from '@/app/(dashboard)/loading';
import Pagination from '../ui/Pagination';


const statsData = [
    {title : "Today", value : "150", icon: <IoCalendar size={30}/>, color:"bg-white"},
    {title : "OnTime", value : "145" , icon: <ImBook size={30}/>, color:"bg-green text-primary"},
    {title : "Late", value : "5", icon: <HiUsers size={30}/>, color:"bg-red text-primary"},
]

const TopSideButtons = () => {
    const {data:session} =  useSession()
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues]  = useState({
        userId : session?.user.id,
        name: session?.user.name,
        date : moment().format("yyyy-MM-DD"), 
        signOut: false,      
        signOutTime :'',
        status: '',    
    })
    const{date, signInTime,signOutTime,status} = formValues  
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value});
    };

    async function handleSubmit() {
        try {
          const response = await fetch("/api/attendance", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil Input Presensi");
            document.getElementById('attend_modal').close()
            location.reload();
        } 
        } catch (error) {
          console.error("Network Error:", error);
        }
      }

    if (session?.user.role == 'STUDENT') {
        return(
            <div className="inline-block lg:float-right">
                <button className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" onClick={()=>document.getElementById('attend_modal').showModal()} >Tambah Kehadiran</button>
                <dialog id="attend_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white">
                    <h3 className="text-md text-center mb-4">Kehadiran Siswa</h3>
                    <form className='card flex flex-col gap-4'>
                        <InputField
                            type="date"
                            value={date}
                            placeholder="Tanggal Hari Ini"
                            label="Tanggal Hari Ini"
                            name="date"
                            readOnly="readOnly"
                        />
                         <InputField
                            type="text"
                            value={status}
                            placeholder="Okey..."
                            label="Status"
                            name="status"
                            onChange={handleChange}
                        />
                    </form>
                    <div className="modal-action">                    
                    <form method="dialog">
                        <button className="btn btn-ghost">Close</button>
                    </form>
                    <button className="btn bg-secondary hover:bg-black text-white" type='submit' onClick={() => handleSubmit()}>Submit</button>
                    </div>
                </div>
                </dialog>
            </div>
        )
    }
   return
}

let PageSize = 10;

export default async function AttendancePage() {
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
                toast.success("Berhasil Sign Out!");
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
                            <th>Nama</th>
                            <th>Masuk</th>
                            <th>Pulang</th>
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
                                        <td>{moment(value.signInTime).format("hh:mm")}</td>
                                        <td>{session?.user.role=== 'STUDENT' ? 
                                                value.signOut ? moment(value.signOutTime).format("hh:mm") : <button className='bg-error px-4 py-1 rounded-md text-white' onClick={() => sign(value.id)}> Sign Out </button> : 
                                                value.signOut ? moment(value.signOutTime).format("hh:mm") : <div className='text-error'>Tidak absen</div> }
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
