import ProfilePage from "@/components/profile/ProfilePage";
import ProfileSenseiPage from "@/components/profile/ProfileSenseiPage";
import ProfilePartnerPage from "@/components/profile/ProfilePartnerPage";
import ProfileStaffPage from "@/components/profile/ProfileStaffPage";
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
    } else if (session?.user.role === "PARTNER") {
        return (
            <ProfilePartnerPage />
        )
    } else if (session?.user.role === "DOCUMENT" || session?.user.role === "FINANCE") {
        return (
            <ProfileStaffPage />
        )
    }
    return
}