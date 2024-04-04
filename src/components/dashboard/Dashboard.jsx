'use client'
import { IoCalendar } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { FaSuitcase } from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi2';
import LineChart from "./components/LineChart";
import DoughnutChart from "./components/DoughnutChart";
import Stats from "../ui/Stats/StatsCard";

const statsData = [
    {title : "Total Attendance", value : "9723", icon: <IoCalendar size={30}/>},
    {title : "Learning Content", value : "23" , icon: <ImBook size={30}/>},
    {title : "Total Jobs", value : "45", icon: <FaSuitcase size={30}/>},
    {title : "Total Student", value : "745", icon: <HiUsers size={30}/>},
]

function dashboard() {
    return (
        <>
         <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {
                statsData.map((d, k) => {
                    return (
                        <Stats key={k} {...d} colorIndex={k}/>
                    )
                })
            }
        </div>

        <div className="grid lg:grid-cols-3 mt-4 grid-cols-1 gap-6">
            <div className="col-span-2">
                <LineChart />
            </div>
            <DoughnutChart/>
        </div>
        </>
       
    );
}

export default dashboard;