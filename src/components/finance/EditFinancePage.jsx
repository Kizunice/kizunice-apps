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
import SelectField from "../ui/SelectField"

export default function EditFinancePage(){
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [students,setStudents] = useState([])
    const [formValues, setFormValues]  = useState({})
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
    const [optionPayment, setOptionPayment] = useState([
        {
            label: "Biaya Pendidikan",
            value: "Biaya Pendidikan",
        },
        {
            label: "Biaya Dokumen Awal",
            value: "Biaya Dokumen Awal",
        },
        {
            label: "Biaya Keberangkatan",
            value: "Biaya Keberangkatan",
        }
    ])

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

    const getData = async () => {
        try {  
            const res = await axios.get(`/api/finance/${params.financeId}`);
            console.log(res.data)
            setFormValues(res.data)
            setPageLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setPageLoading(false)
        }
      };

    useEffect(() => {
    getData();
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
          const response = await fetch(`/api/finance/${params.financeId}`, {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            setLoading(false);
            toast.success("Update data keuangan berhasil");
            router.push('/finance')
          } 
        } catch (error) {
          setLoading(false);
          console.error("Network Error:", error);
        }
      }

    if (pageLoading) return <Loading/>
    return(
        <TitleCard title="Ubah Data Keuangan" topMargin="mt-2"  >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    type="date"
                    value={moment(formValues.transactionDate).format("YYYY-MM-DD")}
                    placeholder="Tanggal"
                    label="Tanggal"
                    name="transactionDate"
                    onChange={handleChange}
                />
                <SelectField
                    value={options.find(({value}) => value === formValues.transactionType)}
                    placeholder="Pilih Tipe Transaksi"
                    label="Tipe Transaksi"
                    name="transactionType"
                    options={options}
                    onChange={(value, meta) => handleSelect(value, meta)}
                />
                <SelectField
                    value={students.find(({value}) => value === formValues.studentId)}
                    placeholder="Pilih Nama Siswa"
                    label="Nama Siswa"
                    name="studentId"
                    options={students}
                    onChange={(value, meta) => handleSelect(value, meta)}
                />
                <InputField
                    type="text"
                    value={formValues.amount}
                    placeholder="100000"
                    label="Jumlah"
                    name="amount"
                    onChange={handleChange}
                />
                <SelectField
                    value={optionPayment.find(({value}) => value === formValues.studentPayment)}
                    placeholder="Pilih Pembayaran"
                    label="Pembayaran untuk"
                    name="studentPayment"
                    options={optionPayment}
                    onChange={(value, meta) => handleSelect(value, meta)}
                />
                <InputField
                    type="text"
                    value={formValues.description}
                    label="Keterangan"
                    name="description"
                    onChange={handleChange}
                />
            </div>
            <div className="divider" ></div>
            <Button handleSubmit={handleSubmit} text={"Submit Keuangan"} loading={loading} />
        </TitleCard>
    )
}