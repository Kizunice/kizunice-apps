'use client'
import { useState, useEffect } from "react";
import moment from 'moment';
import { useSession } from 'next-auth/react'

import Stats from "../ui/Stats/StatsCard";
import TitleCard from "../ui/Cards/TitleCards";
import { DUMMY_ATTENDANCE } from "@/lib/dummyData";


// const statsData = [
//     {title : "Total Attendance", value : "9723", icon: <IoCalendar size={30}/>},
//     {title : "Learning Content", value : "23" , icon: <ImBook size={30}/>},
//     {title : "Total Jobs", value : "45", icon: <FaSuitcase size={30}/>},
//     {title : "Total Student", value : "745", icon: <HiUsers size={30}/>},
// ]

const TopSideButtons = () => {

    const {data:session} =  useSession()
    if (session?.user.role == 'STUDENT') {
        return(
            <div className="inline-block float-right">
                <button className="btn px-4 btn-sm normal-case bg-primary text-white" >Add Attendance</button>
            </div>
        )
    }
   return
}

function attendance() {
    const [data, setData] = useState(DUMMY_ATTENDANCE)
    const [loading, setLoading] = useState(false)

    const [today, setToday] = useState()
    const [absent, setAbsent] = useState()
    const [late, setLate] = useState()

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
    //     // console.log(now.format("d/m/yyyy"))
    //     // data.find((date) =>{
    //     //     console.log(date)
    //     //     if(date === now){
    //     //         console.log("yes")
    //     //     }
    //     //     console.log("no")
    //     // })
    //     // data.map((d) =>{
    //     //     // console.log(d.date)
    //     //     setToday(d.date.length)
            
    //     // })
    //     // // console.log(today)
    // })

    return (
        <>
        
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
                                    <th >
                                        <div className="flex items-center">
                                            <div className="badge badge-success text-white font-normal">{d.status}</div>
                                        </div>
                                    </th>
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