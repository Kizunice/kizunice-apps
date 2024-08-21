import TitleCard from "../ui/TitleCards"
import ImageUpload from "../ui/ImageUpload"
import InputField from "../ui/InputField"
import moment from "moment"

export const TableBiodata = ({values}) => {
    return (
        <TitleCard title="Biodata Siswa" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="row-span-3 content-center border rounded-lg">
                    <div className="items-center justify-center">
                        <ImageUpload url={values.image} sizes="w-[200px] h-[200px]" button="hidden" />
                    </div>
                </div>
                <InputField
                    type="text"
                    value={values.asalLPK}
                    label="Asal LPK"
                    name="asalLPK"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.studyMonth}
                    label="Lama Belajar"
                    name="studyMonth"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.paspor}
                    label="Nomor Paspor"
                    name="paspor"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.name}
                    label="Nama Lengkap"
                    name="name"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.email}
                    label="Email"
                    name="email"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.phone}
                    label="Nomor Handphone"
                    name="phone"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.address}
                    label="Alamat Rumah"
                    name="address"
                    readOnly="readOnly"
                />
                <InputField
                    value={values.gender}
                    label="Jenis Kelamin"
                    name="gender"
                    readOnly="readOnly"
                />
                <InputField
                    type="number"
                    value={values.age}
                    label="Umur"
                    name="age"
                    readOnly="readOnly"
                />
                <InputField
                    type="date"
                    value={moment(values.dateOfBirth).format("YYYY-MM-DD")}
                    label="Tanggal Lahir"
                    name="dateOfBirth"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.placeOfBirth}
                    label="Tempat Lahir"
                    name="placeOfBirth"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.religion}
                    label="Agama"
                    name="religion"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.status}
                    label="Status"
                    name="status"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.bodyHeight}
                    label="Tinggi Badan"
                    name="bodyHeight"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.bodyWeight}
                    label="Berat Badan"
                    name="bodyWeight"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.blood}
                    label="Golongan Darah"
                    name="blood"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.waistLine}
                    label="Lingkar Pinggang"
                    name="waistLine"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.teesSize}
                    label="Ukuran Baju"
                    name="teesSize"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.shoesSize}
                    label="Ukuran Sepatu"
                    name="shoesSize"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.smoking}
                    label="Merokok"
                    name="smoking"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.drinking}
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
                        value={values.esName}
                        label="Nama SD"
                        name="esName"
                        readOnly="readOnly"
                    />
                </div>
                <InputField
                    type="date"
                    value={moment(values.esYearIn).format("YYYY-MM-DD")}
                    label="Tanggal Masuk"
                    name="esYearIn"
                    readOnly="readOnly"
                />
                <InputField
                    type="date"
                    value={moment(values.esYearOut).format("YYYY-MM-DD")}
                    label="Tanggal Lulus"
                    name="esYearOut"
                    readOnly="readOnly"
                />
                <div className="col-span-2 md:col-span-1">
                    <InputField
                        type="text"
                        value={values.msName}
                        label="Nama SMP"
                        name="msName"
                        readOnly="readOnly"
                    />
                </div>
                <InputField
                    type="date"
                    value={moment(values.msYearIn).format("YYYY-MM-DD")}
                    label="Tanggal Masuk"
                    name="msYearIn"
                    readOnly="readOnly"
                />
                <InputField
                    type="date"
                    value={moment(values.msYearOut).format("YYYY-MM-DD")}
                    label="Tanggal Lulus"
                    name="msYearOut"
                    readOnly="readOnly"
                />
                <div className="col-span-2 md:col-span-1">
                    <InputField
                        type="text"
                        value={values.hsName}
                        label="Nama SMA / SMK"
                        name="hsName"
                        readOnly="readOnly"
                    />
                </div>
                <InputField
                    type="date"
                    value={moment(values.hsYearIn).format("YYYY-MM-DD")}
                    label="Tanggal Masuk"
                    name="hsYearIn"
                    readOnly="readOnly"
                />
                <InputField
                    type="date"
                    value={moment(values.hsYearOut).format("YYYY-MM-DD")}
                    label="Tanggal Lulus"
                    name="hsYearOut"
                    readOnly="readOnly"
                />
            </div>

            <h1 className="font-semibold text-lg mt-6">Riwayat Pekerjaan</h1>
            <div className="divider" ></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <InputField
                    type="text"
                    value={values.jobCompany}
                    label="Nama Perusahaan"
                    name="jobCompany"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.jobDesc}
                    label="Detail Pekerjaan"
                    name="jobDesc"
                    readOnly="readOnly"
                />
                <InputField
                    type="date"
                    value={moment(values.jobYearIn).format("YYYY-MM-DD")}
                    label="Tahun Masuk"
                    name="jobYearIn"
                    style={"pr-[-10px]"}
                    readOnly="readOnly"
                />
                <InputField
                    type="date"
                    value={moment(values.jobYearOut).format("YYYY-MM-DD")}
                    label="Tahun Keluar"
                    name="jobYearOut"
                    readOnly="readOnly"
                />
                
                {
                    values.job2Company ? ( 
                        <>
                        <InputField
                            type="text"
                            value={values.job2Company}
                            label="Nama Perusahaan"
                            name="job2Company"
                            readOnly="readOnly"
                        />
                        <InputField
                            type="text"
                            value={values.job2Desc}
                            label="Detail Pekerjaan"
                            name="job2Desc"
                            readOnly="readOnly"
                        />
                        <InputField
                            type="date"
                            value={moment(values.job2YearIn).format("YYYY-MM-DD")}
                            label="Tanggal Masuk"
                            name="job2YearIn"
                            style={"pr-[-10px]"}
                            readOnly="readOnly"
                        />
                        <InputField
                            type="date"
                            value={moment(values.job2YearOut).format("YYYY-MM-DD")}
                            label="Tanggal Keluar"
                            name="job2YearOut"
                            readOnly="readOnly"
                        />
                        </>
                    ) : ''
                }
            </div>
            <h1 className="font-semibold text-lg mt-6">Biodata Keluarga</h1>
            <div className="divider" ></div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <InputField
                    type="text"
                    value={values.motherName}
                    label="Nama Ibu"
                    name="motherName"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.motherAge}
                    label="Umur"
                    name="motherAge"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.motherJob}
                    label="Pekerjaan"
                    name="motherJob"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.fatherName}
                    label="Nama Bapak"
                    name="fatherName"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.fatherAge}
                    label="Umur"
                    name="fatherAge"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.fatherJob}
                    label="Pekerjaan"
                    name="fatherJob"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.brotherName}
                    label="Nama Saudara"
                    name="brotherName"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.brotherAge}
                    label="Umur"
                    name="brotherAge"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.brotherJob}
                    label="Pekerjaan"
                    name="brotherJob"
                    readOnly="readOnly"
                />
            </div>
        </TitleCard>
    )
}
            