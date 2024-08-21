'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { TableScores } from "./TableScore"
import { TableFinance } from "./TableFinance"
import { TableBiodata } from "./TableBiodata"
import { TableJob } from "./TableJob"
import Loading from "@/app/(dashboard)/loading"

export default function DetailProfilePage(){
    const params = useParams()
    const {data:session} =  useSession()
    const [loading, setLoading] = useState(true)
    const [values, setValues]  = useState({})
    const [index, setIndex] = useState(0)

    const getProfileData = async () => {
        try {  
            const res = await axios.get(`/api/data/student/${params.profileId}`);
            const profile  = res.data
            if(profile.length !== 0) {
                setValues(profile)
            }
            setLoading(false);
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false);
        }
      };

    useEffect(() => {
        console.log(index)
        getProfileData();
    }, []);

    const DisplayTable = (index) => {
        switch (index) {
            case 0 : return <TableBiodata values={values} />
            case 1 : return <TableScores values={values} />
            case 2 : return <TableJob values={values} />
            case 3 : return <TableFinance values={values} />
        }
    }
   
    if(loading) return <Loading />
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                    <li><button onClick={() => {setIndex(0)}} >Biodata Siswa</button></li>
                    <li><button onClick={() => {setIndex(1)}} >Data Nilai </button></li>
                    <li><button onClick={() => {setIndex(2)}} >Data Job </button></li>
                    <li>
                        {session?.user.role === "ADMIN" ? (
                            <button onClick={() => {setIndex(3)}} >Data Pembayaran </button>
                        ) : ''}
                    </li>
                </ul>
            </div>
            {DisplayTable(index)}
        </>
    )
}

