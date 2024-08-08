import DetailStudentProfilePage from "@/components/profile/DetailStudentProfilePage"

export default function DetailStudentPage({ params }) {
    return (
      <DetailStudentProfilePage params={params} />
    )
  }


// import prisma from '@/lib/prisma'
// import moment from 'moment'
// import TitleCard from '@/components/ui/TitleCards'
// import InputField from '@/components/ui/InputField'
// import ImageUpload from '@/components/ui/ImageUpload'

// const ProfileDetail = async ({params}) => {
//     const detail = await prisma.studentProfile.findUnique({
//         where: {
//             userId:params.profileId
//         },
//         include : {
//             attendances : true,
//             learning : true,
//             scores: true,
//         }
//     })
//     const TableLearning =  () =>{
//         const values = detail.learning
//         if (values)
//         return (
//             <>
//             <h3 className='font-semibold text-secondary mb-4'>Data Pembelajaran</h3>
//             <table className="table w-full">
//                 <thead >
//                 <tr className="font-bold text-primary text-[14px]">
//                     <th>No</th>
//                     <th>Tanggal</th>
//                     <th>Sensei</th>
//                     <th>Bab</th>
//                     <th>Title</th>
//                     <th>Deskripsi</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         values.map((value,index) =>{
//                             return (
//                                 <tr key={value.id} className="text-grey ">
//                                     <td>{index+1}</td>
//                                     <td>{moment(value.date).format("DD/MM/YYYY")}</td>
//                                     <td>{value.senseiName}</td>
//                                     <td>{value.part}</td>
//                                     <td>{value.title}</td>
//                                     <td>{value.description}</td>
//                                 </tr>
//                             )
//                         })    
//                     }
//                 </tbody>
//             </table>
//             </>   
//         ) 
//     }

//     if(!detail) {return (<div>Profile tidak tersedia, silahkan lengkapi</div>)}
//     return (
//         <TitleCard title="Data Siswa" topMargin="mt-2">
//             <ImageUpload url={detail.image} sizes="w-[150px] h-[150px]" button="hidden" />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <InputField
//                     type="text"
//                     value={detail.name}
//                     label="Dari LPK"
//                     name="name"
//                     readOnly="readOnly"
//                 />

//                 <InputField
//                     type="text"
//                     value={detail.name}
//                     label="Nama Lengkap"
//                     name="name"
//                     readOnly="readOnly"
//                 />
                
//                 <InputField
//                     type="text"
//                     value={detail.email}
//                     label="Email"
//                     name="email"
//                     readOnly="readOnly"
//                 />
//                 <InputField
//                     type="text"
//                     value={detail.phone}
//                     label="Nomor Handphone"
//                     name="phone"
//                     readOnly="readOnly"
//                 />
//                 <InputField
//                     type="text"
//                     value={detail.address}
//                     label="Alamat Rumah"
//                     name="address"
//                     readOnly="readOnly"
//                 />
//                 <InputField
//                     type="text"
//                     value={detail.gender}
//                     label="Jenis Kelamin"
//                     name="gender"
//                     readOnly="readOnly"
//                 />
//                 <InputField
//                     type="number"
//                     value={detail.age}
//                     label="Umur"
//                     name="age"
//                     readOnly="readOnly"
//                 />
//                 <InputField
//                     type="date"
//                     value={moment(detail.dateOfBirth).format('YYYY-MM-DD')}
//                     label="Tanggal Lahir"
//                     name="dateOfBirth"
//                     readOnly="readOnly"
//                 />
//                 <InputField
//                     type="text"
//                     value={detail.placeOfBirth}
//                     label="Tempat Lahir"
//                     name="placeOfBirth"
//                     readOnly="readOnly"
//                 />
//                 <InputField
//                     type="text"
//                     value={detail.bodyHeight}
//                     label="Tinggi Badan"
//                     name="bodyHeight"
//                     readOnly="readOnly"
//                 />
//                 <InputField
//                     type="text"
//                     value={detail.bodyWeight}
//                     label="Berat Badan"
//                     name="bodyWeight"
//                     readOnly="readOnly"
//                 />
//             </div>
//             <div className="divider" ></div>
//             <TableLearning />
//         </TitleCard>
//     )
// }

// export default ProfileDetail