import moment from "moment"
import { formatterIDR } from "@/lib/utils"
import TitleCard from "../ui/TitleCards"

export const TableFinance =  ({values}) =>{
    if (values) {
        return (
            <TitleCard title="Data Pembayaran Siswa" topMargin="mt-2">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Jumlah</th>
                        <th>Pembayaran</th>
                        <th>Keterangan</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            values.financeTransactions.map((value,idx) =>{
                                return (
                                    <tr key={idx} className="text-grey ">
                                        <td>{idx+1}</td>
                                        <td>{moment(value.transactionDate).format("DD MMM YYYY")}</td>
                                        <td>{formatterIDR(value.amount)}</td>
                                        <td>{value.studentPayment}</td>
                                        <td>{value.description}</td>
                                    </tr>
                                )
                            })    
                        }
                    </tbody>
                </table>
            </TitleCard>
        ) 
    }
    
}