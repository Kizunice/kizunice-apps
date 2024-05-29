'use client'
import { useState , useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react'
import Stats from "@/components/ui/StatsCard";
import TitleCard from '@/components/ui/TitleCards';
import InputField from "../ui/InputField";
import toast from "react-hot-toast";
import Loading from '@/app/(dashboard)/loading';
import SelectField from '../ui/SelectField';
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { formatterIDR } from '@/lib/utils';


const TopSideButtons = () => {
    const {data:session} =  useSession()
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

    const [formValues, setFormValues]  = useState({
        userId : session?.user.id,
        transactionType: 'EXPENSE',      
        transactionDate :moment().format("yyyy-MM-DD"),
        amount: '', 
        description:''
    })

    const{transactionDate, transactionType,amount, description} = formValues  

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value});
    };

    async function handleSubmit() {
        console.log(formValues)
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
            document.getElementById('attend_modal').close()
            location.reload();
        } 
        } catch (error) {
          console.error("Network Error:", error);
        }
      }
    

    if (session?.user.role == 'ADMIN') {
        return(
            <div className="inline-block float-right">
                <button className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" onClick={()=>document.getElementById('attend_modal').showModal()} >Tambah Data</button>
                <dialog id="attend_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white gap-4">
                    <h3 className="text-md text-center mb-4">Tambah Data Keuangan</h3>
                    <div className='flex flex-col gap-4'>
                        <InputField
                            type="date"
                            value={transactionDate}
                            placeholder="Tanggal"
                            label="Tanggal"
                            name="date"
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

export default async function FinancePage() {
    const [values, setValues] = useState([])
    const [incomes, setIncomes] = useState()
    const [expenses, setExpenses] = useState()
    const [loading, setLoading] = useState(true)

    const getTransaction = async () => {
        try {  
            const res = await axios.get('/api/finance');
            const data = res.data
            setValues(data)
            setIncomes(data.filter(el => el.transactionType === "INCOME"))
            setExpenses(data.filter(el => el.transactionType === "EXPENSE"))
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
    getTransaction();
    }, []);
    
    if(loading) return <Loading/> 

    return (
        <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-2 mb-6">
                <Stats
                    title="Total Pemasukan"
                    icon={<FaMoneyBillTransfer size={30} />}
                    color="bg-green text-secondary"
                    size="text-[22px]"
                    value={formatterIDR(incomes.reduce((acc,income) => acc + income.amount, 0))}
                />
                <Stats
                    title="Total Pengeluaran"
                    icon={<FaMoneyBillTransfer size={30} />}
                    color="bg-red text-secondary"
                    size="text-[22px]"
                    value={formatterIDR(expenses.reduce((acc,income) => acc + income.amount, 0))}
                />
            </div>
        
            <TitleCard title={"Data Neraca Keuangan"} topMargin="mt-2"TopSideButtons={<TopSideButtons />} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-primary text-[14px]">
                            <th>Tanggal</th>
                            <th>Tipe</th>
                            <th>Jumlah</th>
                            <th>Deskripsi</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                            values.map((value) =>{
                                return (
                                    <tr key={value.id} className="text-grey items-center">
                                        <td>{moment(value.transactionDate).format("DD/MM/yyyy")}</td>
                                        <td className="flex items-center">
                                            <span 
                                                className={`badge px-4 text-white font-normal ${value.transactionType === "EXPENSE" ? "badge-error" : "badge-success"}`}
                                            >{value.transactionType}</span>
                                        </td>
                                        <td>{formatterIDR(value.amount)}</td>
                                        <td>{value.description}</td>
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
