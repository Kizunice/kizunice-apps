'use client'
import { useParams } from "next/navigation"
export default async function() {
    const params = useParams()
    return(
        <div>THIS IS DETAIL JOB {params.jobsId}</div>
    )
}