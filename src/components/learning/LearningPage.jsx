import { fetchAll , getSensei} from "@/app/api/queries/learning";
import TitleCard from "../ui/Cards/TitleCards";
import moment from "moment";

export default async function LearningPage() {
    const learning = await fetchAll()
    console.log(learning)
    return (
        <TitleCard title={"Data Belajar"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>Judul</th>
                        <th>Bagian</th>
                        <th>Deskripsi</th>
                        <th>Tanggal</th>
                        <th>Sensei</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            learning.map(data =>{
                                return (
                                    <tr key={data.id} className="text-grey ">
                                    <td>{data.title}</td>
                                    <td>Bab {data.part}</td>
                                    <td>{data.description}</td>
                                    <td>{moment(data.createdAt).format('DD-MMM-YYYY')}</td>
                                    <td>{data.uploadedBy}</td>
                                    <td className="flex items-center">
                                        <span className="badge badge-success px-4 text-white font-normal"></span>
                                    </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    );
}
