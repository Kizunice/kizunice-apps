'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import { useSession } from "next-auth/react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateScorePage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues]  = useState({
        studentId: "",
        learningId: "",
        senseiId: "",
        senseiName: "",
        bunpou:'',
        choukai:'',
        kanji:'',
        kaiwa:'',
        bunka:'',
        aisatsu:'',
        pushUp:'',
        sitUp:'',
        barbel:'',
    })
    const{learningId, studentId,senseiName, bunpou,choukai,kanji,kaiwa,bunka,aisatsu,pushUp,sitUp,barbel,} = formValues
    const [optionsL,setOptionsL] = useState([])
    const [optionsS,setOptionsS] = useState([])

    const getUsers = async () => {
        setLoading(true)
        try {  
            const res = await axios.get('/api/profile/sensei');
            const users = res.data
            console.log(users)
            setFormValues({...formValues, senseiId : users.id, senseiName: users.name})
            console.log(res.data)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    async function fetchDataLearning() {
        const { data } = await axios.get("/api/learning");
        const resultsL = []
        const resultsS = []
        console.log("my learning :", data)
        data.forEach((value) => {
            resultsL.push({
                label: value.part + " - " + value.title,
                value: value.id,
            });
            value.students.forEach((val) => {
                resultsS.push({
                    label: val.name,
                    value: val.id,
                });
            });
        });
        
        setOptionsL([
          {key: 'Select Learning Materi', value: ''}, 
          ...resultsL
        ])

        setOptionsS([
            {key: 'Select a company', value: ''}, 
            ...resultsS
        ])
    }

   

    useEffect(() => {
        getUsers()
        fetchDataLearning();
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
          const response = await fetch("/api/score", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil menambahkan nilai siswa");
            router.push('/score')
            setLoading(false);
          } 
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
      }

    return (
        <>
            <Toaster />
            <TitleCard title="Tambah Nilai Siswa" topMargin="mt-2"  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        type="text"
                        value={senseiName}
                        placeholder="Sensei"
                        label="Nama Sensei"
                        name="senseiName"
                        onChange={handleChange}
                    />
                    <SelectField
                        value={learningId}
                        placeholder="Materi Belajar"
                        label="Materi Belajar"
                        name="learningId"
                        options={optionsL}
                        onChange={handleChange}
                    />
                    <SelectField
                        value={studentId}
                        placeholder="Nama Siswa"
                        label="Nama Siswa"
                        name="studentId"
                        options={optionsS}
                        onChange={handleChange}
                    />
                </div>
                <div className="divider" ></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        type="text"
                        value={bunpou}
                        placeholder="Bunpou"
                        label="Bunpou"
                        name="bunpou"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={choukai}
                        placeholder="Choukai"
                        label="Choukai"
                        name="choukai"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={kanji}
                        placeholder="Kanji"
                        label="Kanji"
                        name="kanji"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={kaiwa}
                        placeholder="Kaiwa"
                        label="Kaiwa"
                        name="kaiwa"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={bunka}
                        placeholder="Bunka"
                        label="Bunka"
                        name="bunka"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={aisatsu}
                        placeholder="Aisatsu"
                        label="Aisatsu"
                        name="aisatsu"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={pushUp}
                        placeholder="Push Up"
                        label="Push Up"
                        name="pushUp"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={sitUp}
                        placeholder="Sit Up"
                        label="Sit Up"
                        name="sitUp"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={barbel}
                        placeholder="Barbel"
                        label="Barbel"
                        name="barbel"
                        onChange={handleChange}
                    />
                </div>
                <div className="divider" ></div>
                <Button handleSubmit={handleSubmit} text={"Submit Nilai"} loading={loading} />
            </TitleCard>
        </>
    )
}