'use client'
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import TitleCard from "@/components/ui/TitleCards";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import toast  from "react-hot-toast";

export default function EditScorePage() {
    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues]  = useState({
        studentId: "",
        learningId: "",
        senseiId: "",
        senseiName: "",
        grade: "",
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
    const{learningId, studentId,senseiName,grade, bunpou,choukai,kanji,kaiwa,bunka,aisatsu,pushUp,sitUp,barbel,} = formValues
    const [optionsL,setOptionsL] = useState([])
    const [optionsS,setOptionsS] = useState([])
    const [optionsG, setOptionsG] = useState([
        { value: 'A', label: 'A'}, 
        { value: 'B', label: 'B'},
        { value: 'C', label: 'C'},
        { value: 'D', label: 'D'},
        { value: 'E', label: 'E'},
    ])

    const getScoresData = async () => {
        setLoading(true)
        try {  
            const res = await axios.get(`/api/score/${params.scoreId}`);
            const data = res.data
            console.log(data)
            setFormValues({...formValues, ...data, senseiName: data.sensei.name, senseiId: data.sensei.id})
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    async function fetchDataLearning() {
        const { data } = await axios.get("/api/learning");
        const resultsL = []
        data.forEach((value) => {
            resultsL.push({
                label: value.part + " - " + value.title,
                value: value.id,
            });
        });
        setOptionsL([
          {key: 'Select Learning Materi', value: ''}, 
          ...resultsL
        ])
    }

    async function fetchDataStudents() {
        const { data } = await axios.get("/api/profile");
        const resultsS = []
        data.forEach((value) => {
            resultsS.push({
                label: value.name + " - " + value.asalLPK,
                value: value.id,
            });
        });
        setOptionsS([
            {key: 'Select student', value: ''}, 
            ...resultsS
        ])
    }

    useEffect(() => {
        getScoresData()
        fetchDataLearning();
        fetchDataStudents()
      }, []);

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        
        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    const handleSelect = (value, meta) => {
        setFormValues({ ...formValues, [meta.name]: value.value});
        console.log(formValues)
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
            toast.success("Berhasil input data nilai");
            router.push('/score')
            setLoading(false);
          } else {
            setLoading(false);
            toast.error("Gagal input data nilai");
          }
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
      }

    return (
        <TitleCard title="Tambah Nilai Siswa" topMargin="mt-2"  >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    type="text"
                    value={senseiName}
                    placeholder="Sensei"
                    label="Nama Sensei"
                    name="senseiName"
                    readOnly="readOnly"
                />
                <SelectField
                    value={optionsL.find(({value}) => value === learningId)}
                    placeholder="Materi Belajar"
                    label="Materi Belajar"
                    name="learningId"
                    options={optionsL}
                    onChange={(value, meta) => handleSelect(value, meta)}
                />
                <SelectField
                    value={optionsS.find(({value}) => value === studentId)}
                    placeholder="Nama Siswa"
                    label="Nama Siswa"
                    name="studentId"
                    options={optionsS}
                    onChange={(value, meta) => handleSelect(value, meta)}
                />
                <SelectField
                    value={optionsG.find(({value}) => value === grade)}
                    placeholder="Pilih grade siswa"
                    label="Grade Siswa"
                    name="grade"
                    options={optionsG}
                    onChange={(value, meta) => handleSelect(value, meta)}
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
            <Button handleSubmit={handleSubmit} text={"Ubah Nilai"} loading={loading} />
        </TitleCard>
    )
}