import moment from "moment"
import TitleCard from "../ui/TitleCards"
export const TableJob =  ({values}) =>{
    if (values)
    return (
        <TitleCard title="Data Job Siswa" topMargin="mt-2">
            <div className="overflow-x-auto w-full">
            <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Nama</th>
                        <th>Jenis Kelamin</th>
                        <th>Usia</th>
                        <th>Lembaga</th>
                        <th>Perusahaan</th>
                        <th>Jenis Pekerjaan</th>
                        <th>Keberangkatan</th>
                        <th>Status</th>
                        <th>Keterangan</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            values.jobApplications.map((value,index) =>{
                                return (
                                    <tr key={value.id} className="text-grey ">
                                        <td>{index+1}</td>
                                        <td>{value.student.name}</td>
                                        <td>{value.student.gender}</td>
                                        <td>{value.student.age}</td>
                                        <td>{value.partner.name}</td>
                                        <td>{value.job.company.name}</td>
                                        <td>{value.job.fieldJob}</td>
                                        <td>{moment(value.job.departure).format("DD MMM yyyy")}</td>
                                        <td>{value.status ? 
                                                    <span className="bg-success rounded-md py-2 px-4 text-white font-normal">Diterima</span>
                                                    :  <span className="bg-error rounded-md py-2 px-4 text-white font-normal">Belum </span>}
                                            </td>
                                        <td>{value.note}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    ) 
}