import Link from "next/link";
import {FaBars} from "react-icons/fa"
import Image from "next/image";
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from "next/navigation";
export default function Header()  {
  const {data:session} = useSession()
  const router = useRouter()

  return (
    <header className="navbar sticky top-0 z-10 h-20 bg-white justify-end lg:px-8">
      <div className="flex-1">
          <label htmlFor="my-drawer-2" className="drawer-button btn btn-primary bg-secondary text-white  lg:hidden">
            <FaBars className="h-5 inline-block w-5 "/>
            Menu
          </label>
          {/* <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1> */}
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end ml-4">
          <div tabIndex={0} role="button" className="flex gap-4 avatar">
            <span className="text-right lg:block">
              <span className="block text-sm font-bold text-black">
                  {session?.user.name}
              </span>
              <span className="block text-xs text-black">{session?.user.role}</span>
            </span>
            <div className="w-10 rounded-full">
              <Image src={session?.user.image ? session?.user.image : "/avatar.png"} width={20} height={20} alt="Avatar Kizunice"/> 
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[9] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"> 
            <li><Link href={"/profile"}>Profile</Link></li>
            <li><Link href={"/settings"}>Settings</Link></li>
            <li><button onClick={() => signOut({ redirect: false }).then(() => {
                  router.push("/login"); // Redirect to the dashboard page after signing out
              })}>Logout</button></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

