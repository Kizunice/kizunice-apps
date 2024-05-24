import axios from "axios"
import prisma from '@/lib/prisma'
import DetailLearningPage from "@/components/learning/DetailLearningPage"

// const LearningDetail = async ({params}) => {
//     const detail = await prisma.learning.findUnique({where:{id:params.learningId}, include: {students:true,scores:true}})
//     console.log(detail)
//     return (
//         <>
//             <div> HELLO ITS {detail.title} </div>
//         </>
//     )
// }

// export default LearningDetail

export default function DetailPage({ params }) {
    return (
      <DetailLearningPage params={params} />
    )
  }