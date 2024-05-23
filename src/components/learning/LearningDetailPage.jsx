// import { useState, useEffect } from "react";
// import moment from "moment";
// import axios from "axios";
// import TitleCard from "@/components/ui/TitleCards";
// import { useSession } from "next-auth/react";
// import InputField from "../ui/InputField";
// import toast, { Toaster } from "react-hot-toast";
// import { useParams } from 'next/navigation'

const LearningDetails = async ({params}) => {
    console.log(params)
    // const response = axios.get(`/api/learning/${params.learningId}`);
    // console.log(response.data)

    return (
        <div> HELOO</div>
    )

}

export default LearningDetails

// export default function LearningDetailPage({data}) {
//     const [values, setValues] = useState([])
//     const [loading, setLoading] = useState(false)

//     const getLearningDetails = async () => {
//         const params = useParams()
//         console.log("params: " + params)
//         // setLoading(true)
//         // try {  
//         //     const res = await axios.get('/api/learning');
//         //     setValues(res.data)
//         //     setLoading(false)
//         // } catch (err) {
//         //   console.log("[collections_GET]", err);
//         //   setLoading(false)
//         // }
//       };

//     useEffect(() => {
//     getLearningDetails();
//     }, []);


//     return (
//         <>
//         <Toaster/>
//         <TitleCard title={"Detil Pembelajaran"} topMargin="mt-2" >
//             <div className="overflow-x-auto w-full">
//                 <table className="table w-full">
//                     <thead >
//                     <tr className="font-bold text-primary text-[14px]">
//                         <th>Tanggal</th>
//                         <th>Sensei</th>
//                         <th>Judul</th>
//                         <th>Bagian</th>
//                         <th>Deskripsi</th>                    
//                         <th>Action</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                         {/* {
//                             values.map(value =>{
//                                 return (
//                                     <tr key={value.id} className="text-grey ">
//                                     <td>{moment(value.createdAt).format('DD-MMM-YYYY')}</td>
//                                     <td>{value.senseiName}</td>
//                                     <td>{value.title}</td>
//                                     <td>{value.part}</td>
//                                     <td>{value.description}</td> 
//                                     <td className="flex items-center">
//                                         <button className="badge badge-success px-4 text-white font-norma" type='submit' onClick={() => handleDetailPage(value.id)}>Detail</button>
//                                     </td>
//                                     </tr>
//                                 )
//                             })    
//                         } */}
//                     </tbody>
//                 </table>
//             </div>
//         </TitleCard>
//         </>
        
//     );
// }