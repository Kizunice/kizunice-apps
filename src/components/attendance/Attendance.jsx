'use client'
import { useState , useEffect, useCallback} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { IoCalendar } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { HiUsers } from 'react-icons/hi2';
import Stats from "@/components/ui/StatsCard";
import TitleCard from '@/components/ui/TitleCards';
import InputField from "../ui/InputField";
import toast, { Toaster } from "react-hot-toast";

const statsData = [
    {title : "Today", value : "150", icon: <IoCalendar size={30}/>, color:"bg-white"},
    {title : "OnTime", value : "145" , icon: <ImBook size={30}/>, color:"bg-green text-primary"},
    {title : "Late", value : "5", icon: <HiUsers size={30}/>, color:"bg-red text-primary"},
]

const TopSideButtons = () => {
    const {data:session} =  useSession()
    const router = useRouter()
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
            // setLoading(false);
            toast.success("Berhasil Input Presensi");
            router.refresh()
          } 
        } catch (error) {
        //   setLoading(false);
          console.error("Network Error:", error);
        }
      }

    if (session?.user.role == 'STUDENT') {
        return(
            <div className="inline-block float-right">
                <button className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" onClick={()=>document.getElementById('attend_modal').showModal()} >Tambah Kehadiran</button>
                <dialog id="attend_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white">
                    <h3 className="text-md text-center mb-4">Kehadiran Siswa</h3>
                    <form>
                        <InputField
                            type="date"
                            value={date}
                            placeholder="Tanggal Hari Ini"
                            label="Tanggal Hari Ini"
                            name="date"
                            onChange={handleChange}
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

export default async function Attendance() {
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(false)
    const {data:session} =  useSession()

    const getAttendance = async () => {
        setLoading(true)
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
            console.log(response)
            if (response.ok) {
                // setLoading(false);
                toast.success("Berhasil memperbarui absensi");
                router.refresh()
            } 
        } catch (error) {
            console.error("Network Error:", error);
        }
    }

    return (
        <>
         <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-3 grid-cols-1 gap-6 mb-6">
            {
                statsData.map((d, k) => {
                    return (
                        <Stats key={k} {...d} />
                    )
                })
            }
        </div>
        <Toaster/>
        <TitleCard title={"Daftar Kehadiran Siswa"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>}>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
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
                            values.map((value) =>{
                                return (
                                    <tr key={value.id} className="text-grey ">
                                    <td>{moment(value.date).format("dddd")}</td>
                                    <td>{moment(value.date).format("DD-MM-yyyy")}</td>
                                    <td>{value.name}</td>
                                    <td>{moment(value.signInTime).format("hh:mm")}</td>
                                    <td>{session?.user.role=== 'STUDENT' ? 
                                            value.signOut ? moment(value.signOutTime).format("hh:mm") : <button className='badge badge-error rounded-md ' onClick={() => sign(value.id)}> Sign Out </button> : 
                                            value.signOut ? moment(value.signOutTime).format("hh:mm") : <div>Siswa tidak absen pulang</div> }
                                    </td>
                                    <td>{value.status}</td>
                                    
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
        </>
        
    );
}
