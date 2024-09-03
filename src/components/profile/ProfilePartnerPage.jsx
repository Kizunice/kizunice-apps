'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import toast from "react-hot-toast"
import moment from "moment"
import Loading from "@/app/(dashboard)/loading"
import { RiDeleteBin5Fill, RiFileEditFill  } from "react-icons/ri";

const TopSideButtons = () => {
    const [loading, setLoading] = useState(true)
    const [formValues, setFormValues]  = useState({
        name: "",
        address:"",
        phone: ""
    })
    const { name, address, phone} = formValues;

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    async function handleSubmit() {
        setLoading(true);
        console.log(formValues)
        try {
            const response = await fetch('/api/data/partner', {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            setLoading(false);
            toast.success("Menambah data perusahaan berhasil");
            document.getElementById('attend_modal').close()
            location.reload();
          } else {
            setLoading(false);
            toast.error("Gagal Ubah data");
          }
        } catch (error) {
          setLoading(false);
          toast.error("Gagal Ubah data");
          console.error("Network Error:", error);
        }
      }


    return(
        <div className="inline-block lg:float-right">
            <button className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" onClick={()=>document.getElementById('attend_modal').showModal()} >Tambah Data Perusahaan</button>
            <dialog id="attend_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-white">
                <h3 className="text-md text-center mb-4">Data Perusahaan</h3>
                <form className="grid grid-cols-1 gap-6">
                    <InputField
                        type="text"
                        value={name}
                        label="Nama Perusahaan"
                        name="name"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={address}
                        label="Alamat Perusahaan"
                        name="address"
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={phone}
                        label="Nomor Perusahaan"
                        name="phone"
                        onChange={handleChange}
                    />
                </form>
                <div className="modal-action">                    
                <form method="dialog">
                    <button className="btn btn-ghost">Close</button>
                </form>
                <button className="btn bg-secondary hover:bg-black text-white" type='submit' onClick={() => handleSubmit()}>Submit</button>
                </div>
            </div>
            </dialog>
        </div>
    )
}

export default function ProfilePartnerPage(){
    const params = useParams()
    const [loading, setLoading] = useState(true)
    
    const [values, setValues] = useState({})

    const getData = async () => {
        try {  
            const res = await axios.get('/api/profile/partner');
            console.log(res.data)
            setValues(res.data)
            setLoading(false)
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false)
        }
      };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (value) => {
        const approval = confirm("Apakah kamu yakin ingin menghapus?")

        if (approval) {
            await fetch(`/api/data/partner/${value}`, { method: "DELETE" });
            location.reload()
        }
    }

    const TableCompanies = ({values}) => {
        if(values) {
            return (
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Nama Perusahaan</th>
                        <th>Alamat Perusahaan</th>
                        <th>Nomor Telpon</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            values.map((value,idx) =>{
                                return (
                                    <tr key={idx} className="text-grey ">
                                        <td>{idx+1}</td>
                                        <td>{value.name}</td>
                                        <td>{value.address}</td>
                                        <td>{value.phone}</td>
                                        <td >
                                            <div className="tooltip" data-tip="Hapus Data">
                                                <RiDeleteBin5Fill 
                                                    onClick={() => handleDelete(value.id)} 
                                                    className="hover:text-primary cursor-pointer p-1 text-3xl"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })    
                        }
                    </tbody>
                </table>
            )
        }    
    }

    if (loading) return <Loading/>
    return(
        <>
            <TitleCard title="Profile Kumiai" topMargin="mt-2" TopSideButtons={<TopSideButtons/>}  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    type="text"
                    value={values.name}
                    placeholder="Nama Akun"
                    label="Nama Akun"
                    name="name"
                />
                <InputField
                    type="text"
                    value={values.email}
                    placeholder="Alamat Email"
                    label="Email"
                    name="email"
                />
                 <InputField
                    type="text"
                    value={values.address}
                    placeholder="Alamat Lembaga"
                    label="Alamat"
                    name="address"
                />
                 <InputField
                    type="text"
                    value={values.phone}
                    placeholder="xxxxxxxxx"
                    label="Nomor Handphone"
                    name="phone"
                />
                </div>
                <h1 className="font-semibold text-lg mt-8">Daftar Perusahaan</h1>
                <div className="divider" ></div>
                <TableCompanies values={values.company}/>
            </TitleCard>
        </>
      
    )
}