'use client'
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import InputField from "../ui/InputField";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
const TopSideButtons = () => {
    const {data:session} =  useSession()
    const router = useRouter()
    const [modal, setModal] = useState(false)
    const [formValues, setFormValues]  = useState({
        title:"",
        description:"", 
        part:"", 
        date: "",
        senseiId: session?.user.id,
        senseiName: session?.user.name,
    })
    const{title, description,part,date,sensei} = formValues
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value});
    };

    async function handleSubmit() {
        try {
          const response = await fetch("/api/learning", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            // setLoading(false);
            toast.success("Create Learning Success");
            router.refresh()
            setModal(false)
          } 
        } catch (error) {
        //   setLoading(false);
          console.error("Network Error:", error);
        }
      }

   const handleModal = (e) => {
        document.getElementById('attend_modal').showModal()
        setModal(true)
    }

    if (session?.user.role == 'SENSEI') {
        return(
            <div className="inline-block float-right">
                <button className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" onClick={() => handleModal()} >Add New</button>
                <dialog id="attend_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box bg-white">
                        <h3 className="text-md text-center mb-4">Add New Learning</h3>
                        <form>
                            <InputField
                                type="text"
                                value={title}
                                placeholder="Judul Materi"
                                label="Judul"
                                name="title"
                                onChange={handleChange}
                            />
                            <InputField
                                type="text"
                                value={part}
                                placeholder="Bab 25"
                                label="Bab Materi"
                                name="part"
                                onChange={handleChange}
                            />
                            <InputField
                                type="text"
                                value={description}
                                placeholder="Detail Materi"
                                label="Deskripsi Materi"
                                name="description"
                                onChange={handleChange}
                            />
                            <InputField
                                type="date"
                                value={date}
                                placeholder="Tanggal"
                                label="Tanggal"
                                name="date"
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

export default async function LearningPage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(false)

    const getLearningData = async () => {
        setLoading(true)
        try {  
            const res = await axios.get('/api/learning');
            console.log(res.data)
            setValues(res.data)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
    getLearningData();
    }, []);

    return (
        <>
        <Toaster/>
        <TitleCard title={"Data Belajar"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>} >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>Tanggal</th>
                        <th>Sensei</th>
                        <th>Judul</th>
                        <th>Bagian</th>
                        <th>Deskripsi</th>                    
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            values.map(value =>{
                                return (
                                    <tr key={value.id} className="text-grey ">
                                    <td>{moment(value.date).format('DD-MMM-YYYY')}</td>
                                    <td>{value.senseiName}</td>
                                    <td>{value.title}</td>
                                    <td>{value.part}</td>
                                    <td>{value.description}</td> 
                                    <td className="flex flex-col gap-2 items-start">
                                        <Link href={`/learning/detail/${value.id}`} className="badge badge-success w-16 text-white font-normal">Detail</Link>
                                        {session?.user.role == 'SENSEI' ?
                                            <Link href={`/learning/edit/${value.id}`} className="badge badge-warning w-16 text-white font-normal">Edit</Link>
                                        : <></>}
                                        
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
