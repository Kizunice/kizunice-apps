'use client'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from 'next/navigation'
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import Select from 'react-select';
import toast from "react-hot-toast";
import moment from "moment"
import Button from "../ui/Button";
import Loading from "@/app/(dashboard)/loading";
import { SCORE_ABC } from "@/constants/routes"
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// const TableCell = ({ getValue, row, column, table }) => {
//   const initialValue = getValue();
//   const [value, setValue] = useState(initialValue);
//   useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);
//   const onBlur = () => {
//     table.options.meta?.updateData(row.index, column.id, value);
//   };
//   return (
//     <input
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       onBlur={onBlur}
//     />
//   );
// };

// const columnHelper = createColumnHelper();
// const columns = [
//   columnHelper.accessor("name", {
//     header: "Name",
//     cell: TableCell,
//   }),
//   columnHelper.accessor("grade", {
//     header: "Grade",
//     cell: TableCell,
//   }),
//   columnHelper.accessor("scoreAvg", {
//     header: "Avg",
//     cell: TableCell,
//   }),
//   columnHelper.accessor("bunpou", {
//     header: "Bunpou",
//     cell: TableCell,
//   }),
//   columnHelper.accessor("choukai", {
//     header: "Choukai",
//     cell: TableCell,
//   }),
//   columnHelper.accessor("kanji", {
//     header: "Kanji",
//     cell: TableCell,
//   }),
//   columnHelper.accessor("kaiwa", {
//     header: "Kaiwa",
//     cell: TableCell,
//   }),
//   columnHelper.accessor("bunka", {
//     header: "Bunka",
//     cell: TableCell,
//   }),
//   columnHelper.accessor("aisatsu", {
//     header: "Aisatsu",
//     cell: TableCell,
//   }),
// ];



export default function EditLearningPage(){
    const params = useParams()
    const router = useRouter()
    const {data:session} =  useSession()
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [scores,setScores] = useState()
    const [newScore,setNewScore] = useState()
    const [formValues, setFormValues]  = useState({
        id: params.editId,
        title:"",
        description:"", 
        part:"", 
        date: "",
        fileUrl:'',
        students: [],
        senseiId: session?.user.id,
        senseiName: session?.user.name,
    })
    const{title, description, part, date, fileUrl} = formValues

    const getLearningData = async () => {
        try {  
            const res = await axios.get(`/api/learning/${params.editId}`);
            setFormValues(res.data)
            if (res.data.scores.length <= 0) {
              let studentData = []
              res.data.students.map(id => {
                studentData.push({
                  studentId: id.id, 
                  learningId: res.data.id,
                  senseiId : res.data.senseiId,
                  grade: res.data.part,
                  name: id.name
                })
              })
              setNewScore(studentData)
            } else if (res.data.scores.length > 0) {
              setNewScore(res.data.scores)
            }
            
            setPageLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setPageLoading(false)
        }
      };

    useEffect(() => {
    getLearningData();
    }, []);

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    const handleInput = (e, studentId) => {
      const { name, value } = e.target;
      let editData = []
      newScore.map((item) => {
        if (item.studentId === studentId && name) {
          editData.push({...item, [name]:value})
        } else {
          editData.push({...item})
        }
      })
      console.log("new",editData)
      setNewScore(editData)
  };

    const handleSelect = (data, meta, studentId) => {
      let editData = []
      newScore.map((item) => {
        if (item.studentId === studentId && meta.name) {
          editData.push({...item, [meta.name]: data.value})
        } else {
          editData.push({...item})
        }
      })
      console.log("new",editData)
      setNewScore(editData)
    };

    async function handleSubmitLearning() {
      setLoading1(true);
      try {
        const response = await fetch("/api/learning/edit", {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: {
            "Content-Type": "application/json",
          },
        })
        
        if (response.ok) {
          setLoading1(false);
          toast.success("Berhasil ubah laporan");
          router.push('/learning')
        } else {
          setLoading1(false);
          toast.error("Gagal ubah laporan");
        }
      } catch (error) {
        setLoading1(false);
        toast.error("Gagal ubah laporan");
        console.error("Network Error:", error);
      }
    }

    async function handleSubmitScore() {
      console.log(newScore)
      setLoading2(true);
      try {
        const response = await fetch("/api/score/edit", {
          method: "POST",
          body: JSON.stringify(newScore),
          headers: {
            "Content-Type": "application/json",
          },
        })
        
        if (response.ok) {
          setLoading2(false);
          toast.success("Berhasil submit nilai");
          router.push('/score')
        } else {
          setLoading2(false);
          toast.error("Gagal submit nilai");
        }
      } catch (error) {
        setLoading2(false);
        toast.error("Gagal submit nilai");
        console.error("Network Error:", error);
      }
    }

      // const inputValue = (value, ref) => {
      //   const inputRef = useRef();
      //   useImperativeHandle(ref, () => ({
      //     changeValue: (newValue) => {
      //       inputRef.current.value = newValue;
      //     }
      //   }));
      //   return <input ref={inputRef} aria-invalid="false" autocomplete="off" type="text" value={value}/>
      // }

      const TableScores =  () =>{
        if (newScore)
        return (
            <table className="table w-full">
                <thead >
                <tr className="font-bold text-primary text-[14px]">
                    <th>No</th>
                    <th>Nama</th>
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
                        newScore.map((value,idx) =>{
                            return (
                                <tr key={value.id} className="text-grey ">
                                    <td>{idx+1}</td>
                                    <td>{value.name ? value.name : value.student.name}</td>
                                    <td>
                                      <input 
                                        type="text"
                                        className="w-10 p-2 border border-gray-300 rounded-md"      
                                        value={value.bunpou}
                                        name="bunpou"
                                        onChange={(e) => handleInput(e, value.studentId)}
                                      />
                                    </td>
                                    <td>
                                      <input 
                                        type="text"
                                        className="w-10 p-2 border border-gray-300 rounded-md"
                                        value={value.choukai}
                                        name="choukai"
                                        onChange={(e) => handleInput(e, value.studentId)}
                                      />
                                    </td>
                                    <td>
                                      <input 
                                          type="text"
                                          className="w-10 p-2 border border-gray-300 rounded-md"
                                          value={value.kanji}
                                          name="kanji"
                                          onChange={(e) => handleInput(e, value.studentId)}
                                        />
                                    </td>
                                    <td>
                                      <Select
                                        value={SCORE_ABC.find((item) => item.value === value.kaiwa)}
                                        placeholder=""
                                        name="kaiwa"
                                        options={SCORE_ABC}
                                        onChange={(data, meta) => handleSelect(data, meta, value.studentId)}
                                        className="w-20"
                                      />
                                    </td>
                                    <td>
                                      <Select
                                        value={SCORE_ABC.find((item) => item.value === value.bunka)}
                                        placeholder=""
                                        name="bunka"
                                        options={SCORE_ABC}
                                        onChange={(data, meta) => handleSelect(data, meta, value.studentId)}
                                        className="w-20"
                                      />
                                    </td>
                                    <td>
                                      <Select
                                        value={SCORE_ABC.find((item) => item.value === value.aisatsu)}
                                        placeholder=""
                                        name="aisatsu"
                                        options={SCORE_ABC}
                                        onChange={(data, meta) => handleSelect(data, meta, value.studentId)}
                                        className="w-20"
                                      />
                                    </td>
                                    <td>
                                      <input 
                                          type="text"
                                          className="w-10 p-2 border border-gray-300 rounded-md"
                                          value={value.pushUp}
                                          name="pushUp"
                                          onChange={(e) => handleInput(e, value.studentId)}
                                        />
                                    </td>
                                    <td>
                                      <input 
                                          type="text"
                                          className="w-10 p-2 border border-gray-300 rounded-md"
                                          value={value.sitUp}
                                          name="sitUp"
                                          onChange={(e) => handleInput(e, value.studentId)}
                                        />
                                    </td>
                                    <td>
                                      <input 
                                          type="text"
                                          className="w-10 p-2 border border-gray-300 rounded-md"
                                          value={value.barbel}
                                          name="barbel"
                                          onChange={(e) => handleInput(e, value.studentId)}
                                        />
                                    </td>
                                </tr>
                            )
                        })    
                    }
                </tbody>
            </table>
        ) 
    }

    if (pageLoading) return <Loading/>
    return(
        <TitleCard title="Ubah Laporan Belajar" topMargin="mt-2"  >
            <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mb-8">
              <InputField
                  type="date"
                  value={moment(date).format("YYYY-MM-DD")}
                  placeholder="Tanggal"
                  label="Tanggal"
                  name="date"
                  onChange={handleChange}
              /> 

              <InputField
                  type="text"
                  value={part}
                  placeholder="Bab 25"
                  label="Bab Materi"
                  name="part"
                  onChange={handleChange}
              />
              <div className="col-span-2">
                <InputField
                    type="text"
                    value={title}
                    placeholder="Judul Materi"
                    label="Judul"
                    name="title"
                    onChange={handleChange}
                />
              </div>
              
              <div className="col-span-2">
                <InputField
                    type="text"
                    value={description}
                    placeholder="Detail Materi"
                    label="Deskripsi Materi"
                    name="description"
                    onChange={handleChange}
                />
              </div>
              <InputField
                  type="text"
                  value={fileUrl}
                  placeholder="Link Youtube/Drive"
                  label="Link File"
                  name="fileUrl"
                  onChange={handleChange}
              />   
            </div>
            <Button handleSubmit={handleSubmitLearning} loading={loading1} text={"Ubah Data Laporan"} />

            <div className="divider my-6" ></div>

            <div className="overflow-x-auto w-full mb-12">
                <TableScores data={newScore} />
                {/* <table>
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table> */}
            </div>
            {
              formValues.scores.length <= 0 ? (
                <Button handleSubmit={handleSubmitScore} loading={loading2} text={"Submit Data Nilai"} />
              ) : (
                <p className="italic text-sm text-gray-700">Catatan : Jika ingin merubah nilai, lakukan pada menu nilai</p>
              )
            }
            
        </TitleCard>
    )
}