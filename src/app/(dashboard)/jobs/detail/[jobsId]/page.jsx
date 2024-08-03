// import { useParams } from "next/navigation"
// export default async function() {
//     const params = useParams()
//     return(
//         <div>THIS IS DETAIL JOB {params.jobsId}</div>
//     )
// }

import DetailJobsPage from "@/components/jobs/DetailJobsPage"

export default function DetailPage({ params }) {
    return (
      <DetailJobsPage params={params} />
    )
  }