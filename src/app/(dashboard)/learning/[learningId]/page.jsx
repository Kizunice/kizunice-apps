import axios from "axios"
import prisma from '@/lib/prisma'

const LearningDetail = async ({params}) => {
    const detail = await prisma.learning.findUnique({where:{id:params.learningId}})
    console.log(detail)
    return (
        <>
            <div> HELLO ITS {detail.title} </div>
        </>
    )
}

export default LearningDetail