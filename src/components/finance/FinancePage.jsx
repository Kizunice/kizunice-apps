'use client'
import { useState , useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react'
import Stats from "@/components/ui/StatsCard";
import TitleCard from '@/components/ui/TitleCards';
import Link from 'next/link';
import Loading from '@/app/(dashboard)/loading';
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { formatterIDR } from '@/lib/utils';

const TopSideButtons = () => {
    const {data:session} =  useSession()

    if (session?.user.role == 'ADMIN' || session?.user.role ==  'FINANCE') {
        return(
            <div className="inline-block float-right">
                <Link href="/finance/create" className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" >Tambah Data Keuangan</Link>
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
            console.log(data)
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
    if (values) {
        return (
            <>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-2 mb-6">
                    <Stats
                        title="Balance"
                        icon={<FaMoneyBillTransfer size={30} />}
                        color="bg-blue text-secondary"
                        size="text-[22px]"
                        value={formatterIDR(incomes.reduce((acc,income) => acc + income.amount, 0)-expenses.reduce((acc,income) => acc + income.amount, 0))}
                    />
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
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Tipe</th>
                                <th>Siswa</th>
                                <th>Jumlah</th>
                                <th>Deskripsi</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                values.map((value, index) =>{
                                    return (
                                        <tr key={value.id} className="text-grey items-center">
                                            <td>{index+1}</td>
                                            <td>{moment(value.transactionDate).format("DD/MM/yyyy")}</td>
                                            <td className="flex items-center">
                                                <span 
                                                    className={`badge px-4 text-white font-normal ${value.transactionType === "EXPENSE" ? "badge-error" : "badge-success"}`}
                                                >{value.transactionType}</span>
                                            </td>
                                            <td>{value.student ? value.student.name : ""}</td>
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
}
