import moment from "moment"
import TitleCard from "../ui/TitleCards"
export const TableScores =  ({values}) =>{
    if (values)
    return (
        <TitleCard title="Data Nilai Siswa" topMargin="mt-2">
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Sensei</th>
                        <th>Materi</th>
                        <th>Tanggal</th>
                        <th>Bunpou</th>
                        <th>Choukai</th>
                        <th>Kanji</th>
                        <th>Kaiwa</th>
                        <th>Bunka</th>
                        <th>Aisatsu</th>
                        <th>Push Up</th>
                        <th>Sit Up</th>
                        <th>Barbel</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            values.scores.map((value,idx) =>{
                                return (
                                    <tr key={idx} className="text-grey ">
                                        <td>{idx+1}</td>
                                        <td>{value.sensei.name}</td>
                                        <td>{value.learning.part}</td>
                                        <td>{moment(value.learning.date).format("DD/MM/YY")}</td>
                                        <td>{value.bunpou}</td>
                                        <td>{value.choukai}</td>
                                        <td>{value.kanji}</td>
                                        <td>{value.kaiwa}</td>
                                        <td>{value.bunka}</td>
                                        <td>{value.aisatsu}</td>
                                        <td>{value.pushUp}</td>
                                        <td>{value.sitUp}</td>
                                        <td>{value.barbel}</td>
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