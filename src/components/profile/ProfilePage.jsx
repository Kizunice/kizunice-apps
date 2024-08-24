'use client'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import TitleCard from "@/components/ui/TitleCards"
import InputField from "@/components/ui/InputField"
import SelectField from "../ui/SelectField"
import toast from "react-hot-toast";
import moment from "moment"
import ImageUpload from "../ui/ImageUpload"
import Button from "../ui/Button"
import Loading from "@/app/(dashboard)/loading"

export default function ProfilePage() {
    const {data:session} =  useSession()
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [avatar, setAvatar] = useState(null)
    const [formValues, setFormValues]  = useState({})
    const { 
        name, 
        nihongoName,
        email, 
        image, 
        phone, 
        parentsPhone,
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
        smokingPerWeek,
        drinking,
        drinkingPerWeek,
        savingAmount,
        savingGoal,
        specialSkill,
        acquintance,
        aboutMe,
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
    const [optionM, setOptionM] = useState([
        {
            label: "Iya",
            value: true,
        },
        {
            label: "Tidak",
            value: false,
        },
    ])
    const getProfileData = async () => {
        try {  
            const res = await axios.get('/api/profile/detail');
            const profile  = res.data
            console.log("profile data :", profile)
            if(profile.length !== 0) {
                setFormValues(profile)
            }
            setPageLoading(false);
        } catch (err) {
          console.log("[collections_GET]", err);
          setPageLoading(false);
        }
      };

    useEffect(() => {
    getProfileData();
    }, []);


    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    const handleSelect = (value, meta) => {
        setFormValues({ ...formValues, [meta.name]: value.value});
        console.log(formValues)
    };

    const saveAvatar = (url) => {
        setFormValues(formValues => ({
            ...formValues,
            image : url
        }))
    }

    async function handleSubmit() {
        setLoading(true);
        try {
            console.log(formValues)
            const response = await fetch("/api/profile", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Profile Update Success");
            setLoading(false);
          } 
          setLoading(false);
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
    }
    
    if(pageLoading) return <Loading />
    return(
        <>
            <TitleCard title="Biodata Siswa" topMargin="mt-2"  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="row-span-3">
                        <ImageUpload onUploadSuccess={saveAvatar} url={image} sizes="w-[200px] h-[200px]" />
                    </div>
                    <InputField
                        type="text"
                        value={asalLPK}
                        placeholder="LPK Kizuna Indonesia Nippon"
                        label="Asal LPK"
                        name="asalLPK"
                        onChange={handleChange}
                    />
                    <InputField
                        type="number"
                        value={studyMonth}
                        placeholder="4"
                        label="Lama Belajar (dalam bulan)"
                        name="studyMonth"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={paspor}
                        label="Nomor Paspor"
                        placeholder="XXXXXX"
                        name="paspor"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={name}
                        placeholder="Nama Lengkap"
                        label="Nama Lengkap"
                        name="name"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={nihongoName}
                        placeholder="Nama Lengkap dalam Nihongo"
                        label="Nama Lengkap dalam Nihongo"
                        name="nihongoName"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={email}
                        placeholder="Alamat Email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={address}
                        placeholder="Jalan Mangga Besar"
                        label="Alamat Rumah"
                        name="address"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={phone}
                        placeholder="+62 8XXXXXXXXX"
                        label="Nomor Handphone Pribadi"
                        name="phone"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={parentsPhone}
                        placeholder="+62 8XXXXXXXXX"
                        label="Nomor Handphone Wali"
                        name="parentsPhone"
                        onChange={handleChange}
                    />
                    <SelectField
                        defaultValue={options.find(({value}) => value === gender)}
                        label="Jenis Kelamin"
                        placeholder={"Pilih jenis kelamin"}
                        name="gender"
                        options={options}
                        onChange={(value, meta) => handleSelect(value, meta)}
                    />
                    <InputField
                        type="number"
                        value={age}
                        placeholder="20"
                        label="Umur"
                        name="age"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={placeOfBirth}
                        placeholder="Jakarta"
                        label="Tempat Lahir"
                        name="placeOfBirth"
                        onChange={handleChange}
                    />
                    <InputField
                        type="date"
                        value={moment(dateOfBirth).format("YYYY-MM-DD")}
                        placeholder="Tanggal Lahir"
                        label="Tanggal Lahir"
                        name="dateOfBirth"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={religion}
                        placeholder="Agama"
                        label="Agama"
                        name="religion"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={status}
                        placeholder="Lajang"
                        label="Status"
                        name="status"
                        onChange={handleChange}
                    />
                    <InputField
                        type="number"
                        value={bodyHeight}
                        placeholder="160"
                        label="Tinggi Badan"
                        name="bodyHeight"
                        onChange={handleChange}
                    />
                    <InputField
                        type="number"
                        value={bodyWeight}
                        placeholder="50"
                        label="Berat Badan"
                        name="bodyWeight"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={blood}
                        placeholder="AB"
                        label="Golongan Darah"
                        name="blood"
                        onChange={handleChange}
                    />
                    <InputField
                        type="number"
                        value={waistLine}
                        placeholder="50"
                        label="Lingkar Pinggang"
                        name="waistLine"
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={teesSize}
                        placeholder="M"
                        label="Ukuran Baju"
                        name="teesSize"
                        onChange={handleChange}
                    />
                     <InputField
                        type="number"
                        value={shoesSize}
                        placeholder="42"
                        label="Ukuran Sepatu"
                        name="shoesSize"
                        onChange={handleChange}
                    />
                    <SelectField
                        defaultValue={optionM.find(({value}) => value === smoking)}
                        label="Merokok"
                        placeholder={"Pilih"}
                        name="smoking"
                        options={optionM}
                        onChange={(value, meta) => handleSelect(value, meta)}
                    />
                     <InputField
                        type="number"
                        value={smokingPerWeek}
                        placeholder="3"
                        label="Jumlah Rokok per Minggu"
                        name="smokingPerWeek"
                        onChange={handleChange}
                    />
                    <SelectField
                        defaultValue={optionM.find(({value}) => value === drinking)}
                        label="Minum Alkohol"
                        placeholder={"Pilih"}
                        name="drinking"
                        options={optionM}
                        onChange={(value, meta) => handleSelect(value, meta)}
                    />
                    <InputField
                        type="number"
                        value={drinkingPerWeek}
                        label="Jumlah botol per Minggu"
                        placeholder="1"
                        name="drinkingPerWeek"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={savingAmount}
                        label="Target Tabungan"
                        placeholder="3000000"
                        name="savingAmount"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={savingGoal}
                        label="Guna Tabungan"
                        placeholder="Untuk beli rumah"
                        name="savingGoal"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={specialSkill}
                        label="Skill"
                        placeholder="Isi keahlianmu"
                        name="specialSkill"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={acquintance}
                        label="Kenalan di Jepang"
                        placeholder="Ya atau Tidak"
                        name="acquintance"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={aboutMe}
                        label="Tentang Keunggulanmu"
                        placeholder="Contoh: suka belajar hal baru"
                        name="aboutMe"
                        onChange={handleChange}
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
                            onChange={handleChange}
                        />
                    </div>
                    <InputField
                        type="date"
                        value={moment(esYearIn).format("YYYY-MM-DD")}
                        label="Tanggal Masuk"
                        name="esYearIn"
                        onChange={handleChange}
                    />
                    <InputField
                        type="date"
                        value={moment(esYearOut).format("YYYY-MM-DD")}
                        label="Tanggal Lulus"
                        name="esYearOut"
                        onChange={handleChange}
                    />
                    <div className="col-span-2 md:col-span-1">
                        <InputField
                            type="text"
                            value={msName}
                            label="Nama SMP"
                            placeholder="SMP..."
                            name="msName"
                            onChange={handleChange}
                        />
                    </div>
                     <InputField
                        type="date"
                        value={moment(msYearIn).format("YYYY-MM-DD")}
                        label="Tanggal Masuk"
                        name="msYearIn"
                        onChange={handleChange}
                    />
                    <InputField
                        type="date"
                        value={moment(msYearOut).format("YYYY-MM-DD")}
                        label="Tanggal Lulus"
                        name="msYearOut"
                        onChange={handleChange}
                    />
                    <div className="col-span-2 md:col-span-1">
                        <InputField
                            type="text"
                            value={hsName}
                            label="Nama SMA / SMK"
                            placeholder="SMA/SMK..."
                            name="hsName"
                            onChange={handleChange}
                        />
                    </div>
                    <InputField
                        type="date"
                        value={moment(hsYearIn).format("YYYY-MM-DD")}
                        label="Tanggal Masuk"
                        name="hsYearIn"
                        onChange={handleChange}
                    />
                    <InputField
                        type="date"
                        value={moment(hsYearOut).format("YYYY-MM-DD")}
                        label="Tanggal Lulus"
                        name="hsYearOut"
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={jobDesc}
                        label="Detail Pekerjaan"
                        placeholder="Saya sebagai.."
                        name="jobDesc"
                        onChange={handleChange}
                    />
                    <InputField
                        type="date"
                        value={moment(jobYearIn).format("YYYY-MM-DD")}
                        label="Tahun Masuk"
                        name="jobYearIn"
                        style={"pr-[-10px]"}
                        onChange={handleChange}
                    />
                    <InputField
                        type="date"
                        value={moment(jobYearOut).format("YYYY-MM-DD")}
                        label="Tahun Keluar"
                        name="jobYearOut"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={job2Company}
                        label="Nama Perusahaan"
                        placeholder="PT.."
                        name="job2Company"
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={job2Desc}
                        label="Detail Pekerjaan"
                        placeholder="Saya sebagai.."
                        name="job2Desc"
                        onChange={handleChange}
                    />
                    <InputField
                        type="date"
                        value={moment(job2YearIn).format("YYYY-MM-DD")}
                        label="Tahun Masuk"
                        name="job2YearIn"
                        style={"pr-[-10px]"}
                        onChange={handleChange}
                    />
                    <InputField
                        type="date"
                        value={moment(job2YearOut).format("YYYY-MM-DD")}
                        label="Tahun Keluar"
                        name="job2YearOut"
                        onChange={handleChange}
                    />
                </div>
                <h1 className="font-semibold text-lg mt-6">Biodata Keluarga</h1>
                <div className="divider" ></div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="col-span-2 lg:col-span-1">
                        <InputField
                            type="text"
                            value={fatherName}
                            label="Nama Bapak"
                            placeholder="Nama Bapak"
                            name="fatherName"
                            onChange={handleChange}
                        />
                    </div>
                     <InputField
                        type="text"
                        value={fatherAge}
                        label="Umur"
                        placeholder="Umur"
                        name="fatherAge"
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={fatherJob}
                        label="Pekerjaan"
                        placeholder="Pekerjaan"
                        name="fatherJob"
                        onChange={handleChange}
                    />
                    <div className="col-span-2 lg:col-span-1">
                        <InputField
                            type="text"
                            value={motherName}
                            label="Nama Ibu"
                            placeholder="Nama Ibu"
                            name="motherName"
                            onChange={handleChange}
                        />
                    </div>
                     <InputField
                        type="text"
                        value={motherAge}
                        label="Umur"
                        placeholder="Umur"
                        name="motherAge"
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={motherJob}
                        label="Pekerjaan"
                        placeholder="Pekerjaan"
                        name="motherJob"
                        onChange={handleChange}
                    />
                    <div className="col-span-2 lg:col-span-1">
                        <InputField
                            type="text"
                            value={brotherName}
                            label="Nama Saudara"
                            placeholder="Nama Saudara"
                            name="brotherName"
                            onChange={handleChange}
                        />
                    </div>
                     <InputField
                        type="text"
                        value={brotherAge}
                        label="Umur"
                        placeholder="Umur"
                        name="brotherAge"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={brotherJob}
                        label="Pekerjaan"
                        placeholder="Pekerjaan"
                        name="brotherJob"
                        onChange={handleChange}
                    />
                    <div className="col-span-2 lg:col-span-1">
                        <InputField
                            type="text"
                            value={brother2Name}
                            label="Nama Saudara"
                            placeholder="Nama Saudara"
                            name="brother2Name"
                            onChange={handleChange}
                        />
                    </div>
                     <InputField
                        type="text"
                        value={brother2Age}
                        label="Umur"
                        placeholder="Umur"
                        name="brother2Age"
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={brother2Job}
                        label="Pekerjaan"
                        placeholder="Pekerjaan"
                        name="brother2Job"
                        onChange={handleChange}
                    />
                </div>


                <div className="divider" ></div>

                <Button handleSubmit={handleSubmit} loading={loading} text={'Update Profile'} />
            </TitleCard>
        </>
      
    )
}

