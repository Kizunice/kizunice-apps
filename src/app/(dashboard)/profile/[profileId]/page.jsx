import prisma from '@/lib/prisma'
import TitleCard from '@/components/ui/TitleCards'
import InputField from '@/components/ui/InputField'
const ProfileDetail = async ({params}) => {
    const detail = await prisma.studentProfile.findUnique({where:{userId:params.profileId}})
    console.log(detail)
    if(!detail) {return (<div>Profile tidak tersedia, silahkan lengkapi</div>)}
    return (
        <TitleCard title="Data Siswa" topMargin="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    type="text"
                    value={detail.name}
                    label="Nama Lengkap"
                    name="name"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={detail.email}
                    label="Email"
                    name="email"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={detail.phone}
                    label="Nomor Handphone"
                    name="phone"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={detail.address}
                    label="Alamat Rumah"
                    name="address"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={detail.gender}
                    label="Jenis Kelamin"
                    name="gender"
                    readOnly="readOnly"
                />
                <InputField
                    type="number"
                    value={detail.age}
                    label="Umur"
                    name="age"
                    readOnly="readOnly"
                />
                <InputField
                    type="date"
                    value={detail.dateOfBirth}
                    label="Tanggal Lahir"
                    name="dateOfBirth"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={detail.placeOfBirth}
                    label="Tempat Lahir"
                    name="placeOfBirth"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={detail.bodyHeight}
                    label="Tinggi Badan"
                    name="bodyHeight"
                    readOnly="readOnly"
                />
                <InputField
                    type="text"
                    value={detail.bodyWeight}
                    label="Berat Badan"
                    name="bodyWeight"
                    readOnly="readOnly"
                />
            </div>
            <div className="divider" ></div>
        </TitleCard>
    )
}

export default ProfileDetail