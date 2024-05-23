import axios from "axios"
import prisma from '@/lib/prisma'

const ProfileDetail = async ({params}) => {
    const detail = await prisma.studentProfile.findUnique({where:{userId:params.profileId}})
    console.log(detail)
    if(!detail) {return (<div>Profile tidak tersedia, silahkan lengkapi</div>)}
    return (
        <>
            <div> its  {detail.name} Profile</div>
        </>
    )
}

export default ProfileDetail