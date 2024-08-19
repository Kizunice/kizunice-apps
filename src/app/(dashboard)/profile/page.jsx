import ProfilePage from "@/components/profile/ProfilePage";
import ProfileSenseiPage from "@/components/profile/ProfileSenseiPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Profile() {
    const session = await getServerSession(authOptions)
    
    if(session?.user.role === "STUDENT") {
        return (
            <ProfilePage/>
        );
    } else if (session?.user.role === "SENSEI") {
        return (
            <ProfileSenseiPage />
        )
    }

    return
}