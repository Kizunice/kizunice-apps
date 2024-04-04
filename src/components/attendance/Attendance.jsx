'use client'
import { useEffect, useState } from 'react';
// import moment from 'moment';
import { useSession } from 'next-auth/react'
import { IoCalendar } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { HiUsers } from 'react-icons/hi2';
import Stats from "../ui/Stats/StatsCard";
import TitleCard from "../ui/Cards/TitleCards";
import { DUMMY_ATTENDANCE } from "@/lib/dummyData";


const statsData = [
    {title : "Today", value : "150", icon: <IoCalendar size={30}/>, color:"bg-white"},
    {title : "OnTime", value : "145" , icon: <ImBook size={30}/>, color:"bg-success text-white"},
    {title : "Late", value : "5", icon: <HiUsers size={30}/>, color:"bg-error text-white"},
]

const TopSideButtons = () => {

    const {data:session} =  useSession()
    if (session?.user.role == 'STUDENT') {
        return(
            <div className="inline-block float-right">
                <button className="btn px-4 btn-sm normal-case bg-primary text-white" >Add New</button>
            </div>
        )
    }
   return
}

function attendance() {
    const [data, setData] = useState(DUMMY_ATTENDANCE)
    // const [loading, setLoading] = useState(false)

    // const [today, setToday] = useState()
    // const [absent, setAbsent] = useState()
    // const [late, setLate] = useState()

    // useEffect(() =>{
    //     setLoading(true)
    //     setData(DUMMY_ATTENDANCE)
    //     const date = moment("1/4/2024"); // Thursday Feb 2015
    //     const dow = date.day();
    //     const sortToday = data.filter(dt => {
    //         // console.log(dt.date)
    //        return moment().isSame(moment(dt.date).day()) === true
    //     });
    //     console.log(sortToday)
    //     console.log(now.format("d/m/yyyy"))
    //     data.find((date) =>{
    //         console.log(date)
    //         if(date === now){
    //             console.log("yes")
    //         }
    //         console.log("no")
    //     })
    //     data.map((d) =>{
    //         // console.log(d.date)
    //         setToday(d.date.length)
            
    //     })
    //     // console.log(today)
    // },[])

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
        
        <TitleCard title={"Attendance"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>}>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Clock In</th>
                        <th>Clock Out</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, k) =>{
                                return (
                                    <tr key={k} className="text-grey ">
                                    <td>{d.user.name}</td>
                                    <td>{d.user.email}</td>
                                    <td>{d.date}</td>
                                    <td>{d.clockIn}</td>
                                    <td>{d.clockOut}</td>
                                    <td className="flex items-center">
                                        <span className="badge badge-success px-4 text-white font-normal"></span>
                                    </td>
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

export default attendance