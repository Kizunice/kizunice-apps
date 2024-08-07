'use client'
import { useState , useEffect} from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react'
import TitleCard from '@/components/ui/TitleCards';
import InputField from "../ui/InputField";
import toast,{Toaster} from "react-hot-toast";
import SelectField from '../ui/SelectField';
import Button from '../ui/Button';
import Loading from '@/app/(dashboard)/loading';

export default function CreateFinancePage() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [options, setOptions] = useState([
        {
          label: "Pengeluaran",
          value: "EXPENSE",
        },
        {
          label: "Pemasukan",
          value: "INCOME",
        }
    ])
    const [loading, setLoading] = useState(false)
    const [students,setStudents] = useState([])
    const [formValues, setFormValues]  = useState({
        userId : session?.user.id,
        studentId: "",
        transactionType: 'EXPENSE',      
        transactionDate :"",
        amount: '', 
        description:'',
    })

    const{transactionDate, transactionType,amount, description, studentProfileId} = formValues  

    async function fetchDataStudents() {
        const { data } = await axios.get("/api/profile");
        const results = []
        console.log("my students :", data)
        data.forEach((value) => {
        results.push({
            label: value.name,
            value: value.id,
        });
        });

        setStudents([
        {key: 'Select a company', value: ''}, 
        ...results
        ])
    }

    useEffect(() => {
        fetchDataStudents();
      }, []);

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        
        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    async function handleSubmit() {
        console.log(formValues)
        setLoading(true)
        try {
          const response = await fetch("/api/finance", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil Tambah Data");
            router.push('/finance')
            setLoading(false);
        } 
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
      }
    

    return(
        <>
        <Toaster />
            <TitleCard title="Tambah Nilai Siswa" topMargin="mt-2"  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        type="date"
                        value={transactionDate}
                        placeholder="Tanggal"
                        label="Tanggal"
                        name="transactionDate"
                        onChange={handleChange}
                    />
                    <SelectField
                        value={transactionType}
                        placeholder="Expense"
                        label="Tipe Transaksi"
                        name="transactionType"
                        options={options}
                        onChange={handleChange}
                    />
                    <SelectField
                        value={studentProfileId}
                        placeholder="Nama Siswa"
                        label="Nama Siswa"
                        name="studentId"
                        options={students}
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={amount}
                        placeholder="100000"
                        label="Jumlah"
                        name="amount"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={description}
                        label="Note"
                        name="description"
                        onChange={handleChange}
                    />
                </div>
                <div className="divider" ></div>
                <Button handleSubmit={handleSubmit} text={"Submit Keuangan"} loading={loading} />
            </TitleCard>
        </>
    )
}
