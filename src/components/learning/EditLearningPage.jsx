'use client'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useParams, useRouter } from 'next/navigation'
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import toast from "react-hot-toast";
import moment from "moment"
import Button from "../ui/Button";
import Loading from "@/app/(dashboard)/loading";

export default function EditLearningPage(){
    const params = useParams()
    const router = useRouter()
    const {data:session} =  useSession()
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [formValues, setFormValues]  = useState({
        id: params.editId,
        title:"",
        description:"", 
        part:"", 
        date: "",
        fileUrl:'',
        students: [],
        senseiId: session?.user.id,
        senseiName: session?.user.name,
    })
    const{title, description, part, date, fileUrl} = formValues

    const getLearningData = async () => {
        try {  
            const res = await axios.get(`/api/learning/${params.editId}`);
            console.log(res.data)
            setFormValues(res.data)
            setPageLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setPageLoading(false)
        }
      };

    useEffect(() => {
    getLearningData();
    }, []);

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    async function handleSubmit() {
        setLoading(true);
        try {
          const response = await fetch("/api/learning/edit", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            setLoading(false);
            toast.success("Update Data Belajar berhasil");
            router.push('/learning')
          } 
        } catch (error) {
          setLoading(false);
          console.error("Network Error:", error);
        }
      }

    if (pageLoading) return <Loading/>
    return(
        <TitleCard title="Ubah Data Belajar" topMargin="mt-2"  >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                  type="date"
                  value={moment(date).format("YYYY-MM-DD")}
                  placeholder="Tanggal"
                  label="Tanggal"
                  name="date"
                  onChange={handleChange}
              /> 
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
                  type="text"
                  value={fileUrl}
                  placeholder="Link File Youtube / Drive"
                  label="Link File"
                  name="fileUrl"
                  onChange={handleChange}
              />   
               
            </div>
            <div className="divider" ></div>
            <Button handleSubmit={handleSubmit} loading={loading} text={"Submit Data Belajar"} />
        </TitleCard>
    )
}