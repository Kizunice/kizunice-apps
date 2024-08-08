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
                    placeholder="LPK Kizuna Indonesia Nippon"
                    label="Asal LPK"
                    name="asalLPK"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.studyMonth}
                    placeholder="4 Bulan"
                    label="Lama Belajar"
                    name="studyMonth"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.paspor}
                    label="Nomor Paspor"
                    placeholder="XXXXXX"
                    name="paspor"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.name}
                    placeholder="Nama Lengkap"
                    label="Nama Lengkap"
                    name="name"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.email}
                    placeholder="Alamat Email"
                    label="Email"
                    name="email"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.phone}
                    placeholder="0812xxxxxxx"
                    label="Nomor Handphone"
                    name="phone"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.address}
                    placeholder="Jalan Mangga Besar"
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
                    placeholder="20"
                    label="Umur"
                    name="age"
                    readOnly="readOnly"
                />
                <InputField
                    type="date"
                    value={moment(values.dateOfBirth).format("YYYY-MM-DD")}
                    placeholder="Tanggal Lahir"
                    label="Tanggal Lahir"
                    name="dateOfBirth"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.placeOfBirth}
                    placeholder="Jakarta"
                    label="Tempat Lahir"
                    name="placeOfBirth"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.religion}
                    placeholder="Agama"
                    label="Agama"
                    name="religion"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.status}
                    placeholder="Lajang"
                    label="Status"
                    name="status"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.bodyHeight}
                    placeholder="160cm"
                    label="Tinggi Badan"
                    name="bodyHeight"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.bodyWeight}
                    placeholder="50kg"
                    label="Berat Badan"
                    name="bodyWeight"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.blood}
                    placeholder="AB"
                    label="Golongan Darah"
                    name="blood"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.waistLine}
                    placeholder="50cm"
                    label="Lingkar Pinggang"
                    name="waistLine"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.teesSize}
                    placeholder="M"
                    label="Ukuran Baju"
                    name="teesSize"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.shoesSize}
                    placeholder="42"
                    label="Ukuran Sepatu"
                    name="shoesSize"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.smoking}
                    placeholder="Merokok atau Tidak Merokok"
                    label="Merokok"
                    name="smoking"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.drinking}
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
                        value={values.esName}
                        label="Nama SD"
                        placeholder="SD..."
                        name="esName"
                        readOnly="readOnly"
                    />
                </div>
                
                <InputField
                    type="text"
                    value={values.esYearIn}
                    label="Tahun Masuk"
                    placeholder="2010"
                    name="esYearIn"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.esYearOut}
                    label="Tahun Lulus"
                    placeholder="2013"
                    name="esYearOut"
                    readOnly="readOnly"
                />

                <div className="col-span-2 md:col-span-1">
                    <InputField
                        type="text"
                        value={values.msName}
                        label="Nama SMP"
                        placeholder="SMP..."
                        name="msName"
                        readOnly="readOnly"
                    />
                </div>
                    <InputField
                    type="text"
                    value={values.msYearIn}
                    label="Tahun Masuk"
                    placeholder="2013"
                    name="msYearIn"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.msYearOut}
                    label="Tahun Lulus "
                    placeholder="2017"
                    name="msYearOut"
                    readOnly="readOnly"
                />
                <div className="col-span-2 md:col-span-1">
                    <InputField
                        type="text"
                        value={values.hsName}
                        label="Nama SMA / SMK"
                        placeholder="SMA/SMK..."
                        name="hsName"
                        readOnly="readOnly"
                    />
                </div>
                    <InputField
                    type="text"
                    value={values.hsYearIn}
                    label="Tahun Masuk "
                    placeholder="2017"
                    name="hsYearIn"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.hsYearOut}
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
                    value={values.jobCompany}
                    label="Nama Perusahaan"
                    placeholder="PT.."
                    name="jobCompany"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.jobDesc}
                    label="Detail Pekerjaan"
                    placeholder="Saya sebagai.."
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
                <InputField
                    type="text"
                    value={values.job2Company}
                    label="Nama Perusahaan"
                    placeholder="PT.."
                    name="job2Company"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.job2Desc}
                    label="Detail Pekerjaan"
                    placeholder="Saya sebagai.."
                    name="job2Desc"
                    readOnly="readOnly"
                />
                <InputField
                    type="date"
                    value={moment(values.job2YearIn).format("YYYY-MM-DD")}
                    label="Tahun Masuk"
                    name="job2YearIn"
                    style={"pr-[-10px]"}
                    readOnly="readOnly"
                />
                <InputField
                    type="date"
                    value={moment(values.job2YearOut).format("YYYY-MM-DD")}
                    label="Tahun Keluar"
                    name="job2YearOut"
                    readOnly="readOnly"
                />
            </div>
            <h1 className="font-semibold text-lg mt-6">Biodata Keluarga</h1>
            <div className="divider" ></div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <InputField
                    type="text"
                    value={values.motherName}
                    label="Nama Ibu"
                    placeholder="Nama Ibu"
                    name="motherName"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.motherAge}
                    label="Umur"
                    placeholder="Umur"
                    name="motherAge"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.motherJob}
                    label="Pekerjaan"
                    placeholder="Pekerjaan"
                    name="motherJob"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.fatherName}
                    label="Nama Bapak"
                    placeholder="Nama Bapak"
                    name="fatherName"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.fatherAge}
                    label="Umur"
                    placeholder="Umur"
                    name="fatherAge"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.fatherJob}
                    label="Pekerjaan"
                    placeholder="Pekerjaan"
                    name="fatherJob"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={values.brotherName}
                    label="Nama Saudara"
                    placeholder="Nama Saudara"
                    name="brotherName"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.brotherAge}
                    label="Umur"
                    placeholder="Umur"
                    name="brotherAge"
                    readOnly="readOnly"
                />
                    <InputField
                    type="text"
                    value={values.brotherJob}
                    label="Pekerjaan"
                    placeholder="Pekerjaan"
                    name="brotherJob"
                    readOnly="readOnly"
                />
            </div>
        </TitleCard>
    )
}
            