"use client"
import Link from "next/link";
import Image from "next/image";
import {ROUTES, ADMIN_ROUTES} from "@/constants/routes"
import { useSession } from "next-auth/react";

export default function Sidebar()  {
  const {data:session} = useSession()
  return (
    <div className="drawer lg:drawer-open bg-white ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-30">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <div className="menu flex justify-between p-4 w-80 min-h-full bg-secondary text-base-content">
          <div className="relative mb-6 mx-auto items-center w-30 h-auto">
            <Image src="/logo.png" width={100} height={100} className="w-full h-auto" priority={true} alt="Kizunice App Logo"/>
          </div>
          <div className="mb-auto">
            <ul>
              <SidebarLink userRole={session?.user?.role}/>
            </ul>
          </div>
          <div className="mx-auto justify-center">
            <span className="block text-white font-bold text-center">Kizunice Academy</span>
            <span className="block text-white text-[11px]">2024 © PT Kizuna Indonesia Nippon</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const SidebarLink =({userRole}) =>{
  if(userRole === 'ADMIN'){
    return ADMIN_ROUTES.map((link, i) => (
      <li key={i}>
        <Link href={link.path} key={i} className="flex text-whitegray text-[16px] font-[400] py-3 gap-4 cursor-pointer items-center hover:text-white">
          {link.icon}{link.name}
        </Link>
      </li>
     
    )) 
  }
  return ROUTES.map((link, i) => (
    <li key={i}>
      <Link href={link.path} key={i} className="flex text-whitegray text-[16px] font-[400] py-3 gap-4 cursor-pointer items-center hover:text-white">
        {link.icon}{link.name}
      </Link>
    </li>
    
  ))
}
