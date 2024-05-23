'use client'
import { IoCalendar } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { FaSuitcase } from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi2';
import LineChart from "./components/LineChart";
import DoughnutChart from "./components/DoughnutChart";
import Stats from "@/components/ui/StatsCard";

const statsData = [
    {title : "Total Attendance", value : "9723", icon: <IoCalendar size={30}/>, color:"bg-white"},
    {title : "Learning Content", value : "23" , icon: <ImBook size={30}/>, color:"bg-white"},
    {title : "Total Jobs", value : "45", icon: <FaSuitcase size={30}/>, color:"bg-white"},
    {title : "Total Student", value : "745", icon: <HiUsers size={30}/>, color:"bg-white"},
]

function DashboardPage() {
    return (
        <>
         <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6 ">
            {
                statsData.map((d, k) => {
                    return (
                        <Stats key={k} {...d} />
                    )
                })
            }
        </div>

        <div className="grid lg:grid-cols-3  grid-cols-1 gap-6">
            <div className="col-span-2">
                <LineChart />
            </div>
            <DoughnutChart/>
        </div>
        </>
       
    );
}

export default DashboardPage;