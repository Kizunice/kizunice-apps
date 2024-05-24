'use client'
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import moment from "moment";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import InputField from "../ui/InputField";
import toast, { Toaster } from "react-hot-toast";

function DetailLearningPage() {
    const params = useParams()
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(false)

    const getLearningDetail = async () => {
        setLoading(true)
        try {  
            const res = await axios.get(`/api/learning/${params.learningId}`);
            console.log(res.data)
            setValues(res.data)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
    getLearningDetail();
    }, []);

    const TopSide =() =>{
        if(values.date) {
            return <div className="badge rounded-md bg-primary text-white text-md p-4">{moment(values.date).format("dddd, DD/MM/yyyy")}</div>
        }
    }

    const TableScores =  () =>{
        if (values.students)
        return (
            <table className="table w-full">
                <thead >
                <tr className="font-bold text-primary text-[14px]">
                    <th>Nama</th>
                    <th>Nilai</th>
                </tr>
                </thead>
                <tbody>
                    {
                        values.students.map(value =>{
                            return (
                                <tr key={value.id} className="text-grey ">
                                    <td>{value.name}</td>
                                </tr>
                            )
                        })    
                    }
                </tbody>
            </table>
        ) 
    }


    return (
        <>
        <Toaster/>
        <TitleCard title={"Detil Materi Belajar"} topMargin="mt-2" TopSideButtons={<TopSide/>} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    type="text"
                    value={values.senseiName}
                    label="Nama Sensei"
                    name="senseiName"
                    readOnly="readOnly"
                />
                <div className="divider md:col-span-2 my-0" ></div>

                <InputField
                    type="text"
                    value={values.title}
                    label="Judul Materi"
                    name="title"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.part}
                    label="Bab"
                    name="part"
                    readOnly="readOnly"
                />
                <div className="md:col-span-2">
                    <InputField
                        type="text"
                        value={values.description}
                        label="Deskripsi Materi"
                        name="description"
                        readOnly="readOnly"
                    />
                </div>
            </div>
            <div className="divider my-8" ></div>
            <div className="overflow-x-auto w-full">
                <TableScores data={values.students} />
            </div>
        </TitleCard>
        </>
        
    );
}

export default DetailLearningPage