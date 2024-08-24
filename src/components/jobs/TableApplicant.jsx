import moment from "moment"
import TitleCard from "../ui/TitleCards"

export const TableAplicant =  ({values}) =>{
    if (values)
    return (
        <table className="table w-full">
                <thead >
                <tr className="font-bold text-primary text-[14px]">
                    <th>No</th>
                    <th>Nama</th>
                    <th>Asal LPK</th>
                    <th>Jenis Kelamin</th>
                    <th>Usia</th>
                    <th>Status</th>
                    <th>Keterangan</th>
                </tr>
                </thead>
                <tbody>
                    {
                        values.map((value,index) =>{
                            return (
                                <tr key={value.id} className="text-grey ">
                                    <td>{index+1}</td>
                                    <td>{value.student.name}</td>
                                    <td>{value.student.asalLPK}</td>
                                    <td>{value.student.gender}</td>
                                    <td>{value.student.age}</td>
                                    <td>{value.status}</td>
                                    <td>{value.note}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
    ) 
}