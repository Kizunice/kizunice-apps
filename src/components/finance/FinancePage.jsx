'use client'
import { useState , useEffect, useCallback, useMemo} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react'
import Stats from "@/components/ui/StatsCard";
import TitleCard from '@/components/ui/TitleCards';
import Link from 'next/link';
import Datepicker from 'react-tailwindcss-datepicker';
import Pagination from '../ui/Pagination';
import Loading from '@/app/(dashboard)/loading';
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { formatterIDR } from '@/lib/utils';
import { RiFileEditFill, RiDeleteBin5Fill } from 'react-icons/ri';

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

let PageSize = 5;

export default function FinancePage() {
    const [values, setValues] = useState([])
    const [incomes, setIncomes] = useState()
    const [expenses, setExpenses] = useState()
    const [loading, setLoading] = useState(true)
    const [loadingData, setLoadingData] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredList, setFilteredList] = useState('');
    
    const [dateFilter, setDateFilter] = useState({
        startDate: null,
        endDate: null,
    });

    const searchHandler = useMemo(() => {
        const filteredData = values.filter((value) => {
            let filterPass = true
            const date = moment(value.transactionDate).format("YYYY-MM-DD")
            if (dateFilter.startDate) {
                filterPass = filterPass && dateFilter.startDate <= date
            }
            if (dateFilter.endDate) {
                filterPass = filterPass && dateFilter.endDate >= date
            }
            return filterPass
        })
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const paginatedList = filteredData.slice(firstPageIndex, lastPageIndex);
        setFilteredList(paginatedList)
    }, [currentPage, values, dateFilter])

    useEffect(() => {
        const timer = setTimeout(() => {
            searchHandler()
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [searchHandler])

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
   
    const handleValueChange = (newValue) => {
        console.log('newValue:', newValue);
        setDateFilter(newValue);
    };

    const DatePicker = () => {
        return (
            <div className="border rounded-lg">
                <Datepicker
                    placeholder={'Pilih Tanggal'}
                    showShortcuts={true}
                    showFooter={true}
                    configs={{
                        shortcuts: {
                            today: "Hari Ini", 
                            yesterday: "Kemarin", 
                            currentMonth: "Bulan Ini", 
                            pastMonth: "Bulan Kemarin",
                        },
                    }} 
                    primaryColor={"blue"} 
                    value={dateFilter}
                    onChange={handleValueChange}
                />
            </div>
        )
    }

    const handleDelete = async (value) => {
        const approval = confirm("Apakah kamu yakin ingin menghapus?")
        if (approval) {
            await fetch(`/api/finance/${value}`, { method: "DELETE" });
            location.reload()
        }
    }
    
    if(loading) return <Loading/> 
    if (filteredList) {
        return (
            <>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-2 mb-6">
                    <Stats
                        title="Balance"
                        icon={<FaMoneyBillTransfer size={30} />}
                        color="bg-blue text-secondary"
                        size="text-[22px]"
                        value={formatterIDR(incomes.reduce((acc,income) => acc + income.amount, 0) - expenses.reduce((acc,income) => acc + income.amount, 0))}
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
            
                <TitleCard 
                    title={"Data Neraca Keuangan"} 
                    topMargin="mt-2"
                    TopMiddleButtons={<DatePicker />}
                    TopSideButtons={<TopSideButtons />} 
                >
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            <thead >
                            <tr className="font-bold text-primary text-[14px]">
                                <th></th>
                                <th>Tanggal</th>
                                <th>Tipe</th>
                                <th>Siswa</th>
                                <th>Jumlah</th>
                                <th>Pembayaran</th>
                                <th>Keterangan</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredList.map((value, index) =>{
                                        return (
                                            <tr key={value.id} className="text-grey">
                                                <td>{index+1}</td>
                                                <td>{moment(value.transactionDate).format("DD/MM/yyyy")}</td>
                                                <td>
                                                    <span 
                                                        className={`badge px-4  text-white font-normal ${value.transactionType === "EXPENSE" ? "badge-error" : "badge-success"}`}
                                                    >{value.transactionType}</span>
                                                </td>
                                                <td>{value.student ? value.student.name : ""}</td>
                                                <td>{formatterIDR(value.amount)}</td>
                                                <td>{value.studentPayment}</td>
                                                <td>{value.description}</td>
                                                <td className='flex flex-row'>
                                                    <div className="lg:tooltip" data-tip="Ubah Data">
                                                        <Link href={`/finance/edit/${value.id}`}>
                                                            <RiFileEditFill 
                                                                className="text-secondary hover:text-primary cursor-pointer p-1 text-3xl"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="lg:tooltip" data-tip="Hapus Data">
                                                        <RiDeleteBin5Fill 
                                                            onClick={() => handleDelete(value.id)} 
                                                            className="text-primary cursor-pointer p-1 text-3xl"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={values.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                </TitleCard>
            </>
            
        );
    }
}
