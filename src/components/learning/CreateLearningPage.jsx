'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import InputField from "../ui/InputField";
import MultiSelectDropdown from "../ui/MultiSelectField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import Loading from "@/app/(dashboard)/loading";

export default function CreateLearningPage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [formValues, setFormValues]  = useState({
        title:"",
        description:"", 
        part:"", 
        date: "",
        students: [],
        senseiId: session?.user.id,
        senseiName: session?.user.name,
    })
    const{title, description,part,date, students} = formValues
    const [options,setOptions] = useState([])

    const getUsers = async () => {
      try {  
          const res = await axios.get('/api/profile/sensei');
          const users = res.data
          console.log(users)
          setFormValues({...formValues, senseiId : users.id, senseiName: users.name})
          console.log(res.data)
          setPageLoading(false)
      } catch (err) {
        console.log("[collections_GET]", err);
        setPageLoading(false)
      }
    };

    async function fetchData() {
      // Fetch data
      const { data } = await axios.get("/api/profile");
      const results = []
      console.log("my category :", data)
      data.forEach((value) => {
        results.push({
          label: value.name,
          value: value.id,
        });
      });

      setOptions([
        {key: 'Select a company', value: ''}, 
        ...results
      ])
    }

    useEffect(() => {
        getUsers()
        fetchData();
    }, []);

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        
        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    const handleMulti = (selectedStudents) => {
        setFormValues({ ...formValues, students: selectedStudents});
        console.log(formValues)
    }

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
            setLoading(false);
            toast.success("Berhasil menambahkan data belajar");
            router.push('/learning')
          } 
        } catch (error) {
          setLoading(false);
          console.error("Network Error:", error);
        }
      }
      
    if(pageLoading) return <Loading/>
    return (
      <TitleCard title="Tambah Data Pembelajaran" topMargin="mt-2"  >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
          <div className="divider" ></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MultiSelectDropdown
                formFieldName={students}
                label="Pilih Siswa"
                options={options}
                onChange={handleMulti}
            />
          </div>
          <div className="divider" ></div>
          
          <Button handleSubmit={handleSubmit} loading={loading} text={"Submit Data Belajar"} />
      </TitleCard>
    )
}