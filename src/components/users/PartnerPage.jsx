import { fetchUsersByRole } from "@/app/api/queries/users";
// import { useEffect, useState } from "react";
import TitleCard from "@/components/ui/TitleCards";
import moment from "moment";
import Link from "next/link";

export default async function PartnerPage() {
    const users = await fetchUsersByRole("PARTNER")

    return (
        <TitleCard title={"Data Partner"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Join Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user =>{
                                return (
                                    <tr key={user.id} className="text-grey ">
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{moment(user.createdAt).format('DD-MMM-YYYY')}</td>
                                    <td className="flex items-center">
                                        <Link href={`/profile/${user.id}`} className="badge badge-success px-4 text-white font-normal">Detail</Link>

                                    </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    );
}
