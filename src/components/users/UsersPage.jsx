import { fetchUsers } from "@/app/api/queries/users";
import TitleCard from "../ui/Cards/TitleCards";
export default async function UsersPage() {
    const users = await fetchUsers()
  
    return (
        <TitleCard title={"Users"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user =>{
                                return (
                                    <tr key={user.id} className="text-grey ">
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className="flex items-center">
                                        <span className="badge badge-success px-4 text-white font-normal"></span>
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
