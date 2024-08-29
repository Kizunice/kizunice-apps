'use client'
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import moment from "moment";
import 'moment/locale/ja';
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import InputField from "../ui/InputField";
import Loading from "@/app/(dashboard)/loading";

function DetailLearningPage() {
    const params = useParams()
    const {data:session} =  useSession()
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(true)

    const getLearningDetail = async () => {
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
            return <div className="badge rounded-md bg-primary text-white text-md p-4">{moment(values.date).format("dddd, ll")}</div>
        }
    }

    const TableScores =  () =>{
        if (values.scores)
        return (
            <table className="table w-full">
                <thead >
                <tr className="font-bold text-primary text-[14px]">
                    <th>Rank</th>
                    <th>Nama</th>
                    <th>Grade</th>
                    <th>Avg</th>
                    <th>Bunpou</th>
                    <th>Choukai</th>
                    <th>Kanji</th>
                    <th>Kaiwa</th>
                    <th>Bunka</th>
                    <th>Aisatsu</th>
                    <th>Push Up</th>
                    <th>Sit Up</th>
                    <th>Barbel</th>
                </tr>
                </thead>
                <tbody>
                    {
                        values.scores.map((value,idx) =>{
                            return (
                                <tr key={value.id} className="text-grey ">
                                    <td>{idx+1}</td>
                                    <td>{value.student.name}</td>
                                    <td className="font-bold">{value.grade}</td>
                                    <td className="font-bold">{value.scoreAvg}</td>
                                    <td>{value.bunpou}</td>
                                    <td>{value.choukai}</td>
                                    <td>{value.kanji}</td>
                                    <td>{value.kaiwa}</td>
                                    <td>{value.bunka}</td>
                                    <td>{value.aisatsu}</td>
                                    <td>{value.pushUp}</td>
                                    <td>{value.sitUp}</td>
                                    <td>{value.barbel}</td>
                                </tr>
                            )
                        })    
                    }
                </tbody>
            </table>
        ) 
    }

    if (loading) return <Loading />
    return (
        <TitleCard title={"Detil Laporan Belajar"} topMargin="mt-2" TopSideButtons={<TopSide/>} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    type="text"
                    value={values.sensei.name}
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
                <TableScores data={values.scores} />
            </div>
        </TitleCard>
    );
}

export default DetailLearningPage