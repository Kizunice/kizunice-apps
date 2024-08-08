'use client'
import { useEffect, useState } from 'react';
import { IoCalendar } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { FaSuitcase } from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi2';
import LineChart from "./components/LineChart";
import DoughnutChart from "./components/DoughnutChart";
import Stats from "@/components/ui/StatsCard";
import axios from 'axios';
import Loading from '@/app/(dashboard)/loading';

export default function DashboardPage() {
    const [loading, setLoading] = useState(true)
    const [totalStudent, setTotalStudent] = useState()
    const [totalLearning, setTotalLearning] = useState()
    const [totalAttendance, setTotalAttendance] = useState()
    const [totalJobs, setTotalJobs] = useState()


    const getTotalData = async () => {
        try {  
            const students = await axios.get("/api/profile")
            const attendance = await axios.get("/api/attendance")
            const learning = await axios.get("/api/learning")
            const jobs = await axios.get("/api/jobs")
            setTotalStudent(students.data.length)
            setTotalAttendance(attendance.data.length)
            setTotalLearning(learning.data.length)
            setTotalJobs(jobs.data.length)
            setLoading(false)
        } catch (err) {
            console.log("[collections_GET]", err);
            setLoading(false)
        }
    };

    useEffect(() => {
    getTotalData();
    }, []);
    
    if (loading) return <Loading />
    return (
        <>
         <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6 ">
            <Stats
                title="Total Kehadiran"
                icon={<IoCalendar size={30} />}
                color="bg-white"
                value={totalAttendance}
            />
            <Stats
                title="Total Materi "
                icon={<ImBook size={30} />}
                color="bg-white"
                value={totalLearning}
            />
            <Stats
                title="Total Lowongan"
                icon={<FaSuitcase size={30} />}
                color="bg-white"
                value={totalJobs}
            />
            <Stats
                title="Total Siswa"
                icon={<HiUsers size={30} />}
                color="bg-white"
                value={totalStudent}
            />
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
