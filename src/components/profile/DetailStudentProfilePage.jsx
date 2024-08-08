'use client'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import SelectField from "../ui/SelectField"
import moment from "moment"
import ImageUpload from "../ui/ImageUpload"
import Loading from "@/app/(dashboard)/loading"
import { formatterIDR } from "@/lib/utils"

export default function DetailStudentProfilePage(){
    const {data:session} =  useSession()
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [avatar, setAvatar] = useState(null)
    const [formValues, setFormValues]  = useState({})
    const { 
        name, 
        email, 
        image, 
        phone, 
        address, 
        gender, 
        age, 
        dateOfBirth, 
        placeOfBirth, 
        bodyHeight, 
        bodyWeight,
        religion,
        status,
        blood,
        asalLPK, 
        studyMonth,
        shoesSize,
        teesSize,
        waistLine,
        smoking,
        drinking,
        paspor,
        jobCompany,
        jobDesc,
        jobYearIn,
        jobYearOut,
        job2Company,
        job2Desc,
        job2YearIn,
        job2YearOut,
        esName,
        esYearIn,
        esYearOut,
        msName,
        msYearIn,
        msYearOut,
        hsName,
        hsYearIn,
        hsYearOut,
        motherName,
        motherAge,
        motherJob,
        fatherName,
        fatherAge,
        fatherJob,
        brotherName,
        brotherAge,
        brotherJob,
        brother2Name,
        brother2Age,
        brother2Job,
        brother3Name,
        brother3Age,
        brother3Job,
    } = formValues;

    const [options, setOptions] = useState([
        {
            label: "Laki-Laki",
            value: "Laki-Laki",
        },
        {
            label: "Perempuan",
            value: "Perempuan",
        },
    ])


    const getProfileData = async () => {
        console.log("cek params:", params.profileId)
        try {  
            const res = await axios.get(`/api/data/student/${params.profileId}`);
            const profile  = res.data
            console.log(profile)
            if(profile.length !== 0) {
                setFormValues(profile)
            }
            setLoading(false);
        } catch (err) {
          console.log("[collections_GET]", err);
          setLoading(false);
        }
      };

    useEffect(() => {
        getProfileData();
    }, []);


    const TableScores =  () =>{
        if (formValues.scores)
        return (
            <table className="table w-full">
                <thead >
                <tr className="font-bold text-primary text-[14px]">
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
                        formValues.scores.map(value =>{
                            return (
                                <tr key={value.id} className="text-grey ">
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
        ) 
    }

    const TableFinance =  (values) =>{
        if (values) {
            return (
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Jumlah</th>
                        <th>Deskripsi</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            formValues.financeTransactions.map(finance,idx =>{
                                return (
                                    <tr key={idx} className="text-grey ">
                                        <td>{idx+1}</td>
                                        <td>{moment(finance.transactionDate).format("DD/MM/YY")}</td>
                                        <td>{formatterIDR(finance.amount)}</td>
                                        <td>{finance.description}</td>
                                    </tr>
                                )
                            })    
                        }
                    </tbody>
                </table>
            ) 
        }
        
    }

   
    if(loading) return <Loading />
    return(
        <>
            <TitleCard title="Biodata Siswa" topMargin="mt-2"  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="row-span-3">
                        <ImageUpload url={image} sizes="w-[200px] h-[200px]" button="hidden" />
                    </div>
                    <InputField
                        type="text"
                        value={asalLPK}
                        placeholder="LPK Kizuna Indonesia Nippon"
                        label="Asal LPK"
                        name="asalLPK"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={studyMonth}
                        placeholder="4 Bulan"
                        label="Lama Belajar"
                        name="studyMonth"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={paspor}
                        label="Nomor Paspor"
                        placeholder="XXXXXX"
                        name="paspor"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={name}
                        placeholder="Nama Lengkap"
                        label="Nama Lengkap"
                        name="name"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={email}
                        placeholder="Alamat Email"
                        label="Email"
                        name="email"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={phone}
                        placeholder="0812xxxxxxx"
                        label="Nomor Handphone"
                        name="phone"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={address}
                        placeholder="Jalan Mangga Besar"
                        label="Alamat Rumah"
                        name="address"
                        readOnly="readOnly"
                    />
                     <SelectField
                        value={gender}
                        defaultValue={gender}
                        label="Jenis Kelamin"
                        name="gender"
                        options={options}
                        readOnly="readOnly"
                    />
                
                    <InputField
                        type="number"
                        value={age}
                        placeholder="20"
                        label="Umur"
                        name="age"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="date"
                        value={moment(dateOfBirth).format("YYYY-MM-DD")}
                        placeholder="Tanggal Lahir"
                        label="Tanggal Lahir"
                        name="dateOfBirth"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={placeOfBirth}
                        placeholder="Jakarta"
                        label="Tempat Lahir"
                        name="placeOfBirth"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={religion}
                        placeholder="Agama"
                        label="Agama"
                        name="religion"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={status}
                        placeholder="Lajang"
                        label="Status"
                        name="status"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={bodyHeight}
                        placeholder="160cm"
                        label="Tinggi Badan"
                        name="bodyHeight"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={bodyWeight}
                        placeholder="50kg"
                        label="Berat Badan"
                        name="bodyWeight"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={blood}
                        placeholder="AB"
                        label="Golongan Darah"
                        name="blood"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={waistLine}
                        placeholder="50cm"
                        label="Lingkar Pinggang"
                        name="waistLine"
                        readOnly="readOnly"
                    />
                     <InputField
                        type="text"
                        value={teesSize}
                        placeholder="M"
                        label="Ukuran Baju"
                        name="teesSize"
                        readOnly="readOnly"
                    />
                     <InputField
                        type="text"
                        value={shoesSize}
                        placeholder="42"
                        label="Ukuran Sepatu"
                        name="shoesSize"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={smoking}
                        placeholder="Merokok atau Tidak Merokok"
                        label="Merokok"
                        name="smoking"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={drinking}
                        placeholder="Minum Alkohol atau Tidak Minum Alkohol"
                        label="Minum Alkohol"
                        name="drinking"
                        readOnly="readOnly"
                    />
                </div>

                <h1 className="font-semibold text-lg mt-6">Riwayat Pendidikan</h1>
                <div className="divider" ></div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="col-span-2 md:col-span-1">
                        <InputField
                            type="text"
                            value={esName}
                            label="Nama SD"
                            placeholder="SD..."
                            name="esName"
                            readOnly="readOnly"
                        />
                    </div>
                    
                    <InputField
                        type="text"
                        value={esYearIn}
                        label="Tahun Masuk"
                        placeholder="2010"
                        name="esYearIn"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={esYearOut}
                        label="Tahun Lulus"
                        placeholder="2013"
                        name="esYearOut"
                        readOnly="readOnly"
                    />

                    <div className="col-span-2 md:col-span-1">
                        <InputField
                            type="text"
                            value={msName}
                            label="Nama SMP"
                            placeholder="SMP..."
                            name="msName"
                            readOnly="readOnly"
                        />
                    </div>
                     <InputField
                        type="text"
                        value={msYearIn}
                        label="Tahun Masuk"
                        placeholder="2013"
                        name="msYearIn"
                        readOnly="readOnly"
                    />
                     <InputField
                        type="text"
                        value={msYearOut}
                        label="Tahun Lulus "
                        placeholder="2017"
                        name="msYearOut"
                        readOnly="readOnly"
                    />
                    <div className="col-span-2 md:col-span-1">
                        <InputField
                            type="text"
                            value={hsName}
                            label="Nama SMA / SMK"
                            placeholder="SMA/SMK..."
                            name="hsName"
                            readOnly="readOnly"
                        />
                    </div>
                     <InputField
                        type="text"
                        value={hsYearIn}
                        label="Tahun Masuk "
                        placeholder="2017"
                        name="hsYearIn"
                        readOnly="readOnly"
                    />
                     <InputField
                        type="text"
                        value={hsYearOut}
                        label="Tahun Lulus "
                        placeholder="2020"
                        name="hsYearOut"
                        readOnly="readOnly"
                    />
                </div>

                <h1 className="font-semibold text-lg mt-6">Riwayat Pekerjaan</h1>
                <div className="divider" ></div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <InputField
                        type="text"
                        value={jobCompany}
                        label="Nama Perusahaan"
                        placeholder="PT.."
                        name="jobCompany"
                        readOnly="readOnly"
                    />
                     <InputField
                        type="text"
                        value={jobDesc}
                        label="Detail Pekerjaan"
                        placeholder="Saya sebagai.."
                        name="jobDesc"
                        readOnly="readOnly"
                    />
                    {/* <div className="flex col col-span-1">
                        
                    </div> */}
                    <InputField
                        type="date"
                        value={moment(jobYearIn).format("YYYY-MM-DD")}
                        label="Tahun Masuk"
                        name="jobYearIn"
                        style={"pr-[-10px]"}
                        readOnly="readOnly"
                    />
                    <InputField
                        type="date"
                        value={moment(jobYearOut).format("YYYY-MM-DD")}
                        label="Tahun Keluar"
                        name="jobYearOut"
                        readOnly="readOnly"
                    />
                </div>
                <h1 className="font-semibold text-lg mt-6">Biodata Keluarga</h1>
                <div className="divider" ></div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <InputField
                        type="text"
                        value={motherName}
                        label="Nama Ibu"
                        placeholder="Nama Ibu"
                        name="motherName"
                        readOnly="readOnly"
                    />
                     <InputField
                        type="text"
                        value={motherAge}
                        label="Umur"
                        placeholder="Umur"
                        name="motherAge"
                        readOnly="readOnly"
                    />
                     <InputField
                        type="text"
                        value={motherJob}
                        label="Pekerjaan"
                        placeholder="Pekerjaan"
                        name="motherJob"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={fatherName}
                        label="Nama Bapak"
                        placeholder="Nama Bapak"
                        name="fatherName"
                        readOnly="readOnly"
                    />
                     <InputField
                        type="text"
                        value={fatherAge}
                        label="Umur"
                        placeholder="Umur"
                        name="fatherAge"
                        readOnly="readOnly"
                    />
                     <InputField
                        type="text"
                        value={fatherJob}
                        label="Pekerjaan"
                        placeholder="Pekerjaan"
                        name="fatherJob"
                        readOnly="readOnly"
                    />
                    <InputField
                        type="text"
                        value={brotherName}
                        label="Nama Saudara"
                        placeholder="Nama Saudara"
                        name="brotherName"
                        readOnly="readOnly"
                    />
                     <InputField
                        type="text"
                        value={brotherAge}
                        label="Umur"
                        placeholder="Umur"
                        name="brotherAge"
                        readOnly="readOnly"
                    />
                     <InputField
                        type="text"
                        value={brotherJob}
                        label="Pekerjaan"
                        placeholder="Pekerjaan"
                        name="brotherJob"
                        readOnly="readOnly"
                    />
                </div>
                <h1 className="font-semibold text-lg mt-6">Data Nilai</h1>
                <div className="divider" ></div>
                <div className="overflow-x-auto w-full">
                    <TableScores data={formValues.scores} />
                </div>

                <h1 className="font-semibold text-lg mt-6">Data Pembayaran</h1>
                <div className="divider" ></div>
                <div className="overflow-x-auto w-full">
                    {/* <TableFinance data={formValues.financeTransactions} /> */}
                </div>
            </TitleCard>
        </>
    )
}

