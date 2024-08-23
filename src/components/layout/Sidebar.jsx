"use client"
import Link from "next/link";
import Image from "next/image";
import {ROUTES, ADMIN_ROUTES, SENSEI_ROUTES, FINANCE_ROUTES} from "@/constants/routes"
import { useSession } from "next-auth/react";
import LogoINA from "../../../public/Logo-INA-Icon.png"
import moment from "moment";

export default function Sidebar()  {
  const {data:session} = useSession()
  return (
    <div className="drawer lg:drawer-open bg-white ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-30">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <div className="menu flex justify-between p-4 w-[250px] min-h-full bg-secondary text-base-content">
          <div className="relative mb-4 mx-auto items-center">
              <Image src={LogoINA} width={60} height={60} priority alt="INA App Logo"/>
          </div>
          <div className="mb-auto">
            <ul>
              <SidebarLink userRole={session?.user?.role}/>
            </ul>
          </div>
          <div className="mx-auto justify-center">
            <span className="block text-gray-400 text-[10px]">{moment().year()} © PT Indonesia Nippon Anugerah</span>
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
        {
          link.sub ? (
            <details>
              <summary className="flex text-whitegray text-[16px] font-[400] py-3 gap-4 cursor-pointer items-center hover:text-white">
                {link.icon} {link.name}
              </summary>
              <ul>
                {link.sub.map((s, i) => (
                  <li key={i} >
                    <Link href={s.path} key={i} className="flex text-whitegray text-[14px] font-[400] py-2 gap-4 cursor-pointer items-center hover:text-white">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ) : (
            <Link href={link.path} key={i} className="flex text-whitegray text-[16px] font-[400] py-3 gap-4 cursor-pointer items-center hover:text-white">
              {link.icon}{link.name}
            </Link>
          )
        }
      </li>
    )) 
  } else if(userRole === 'SENSEI'){
    return SENSEI_ROUTES.map((link, i) => (
      <li key={i}>
        <Link href={link.path} key={i} className="flex text-whitegray text-[16px] font-[400] py-3 gap-4 cursor-pointer items-center hover:text-white">
          {link.icon}{link.name}
        </Link>
      </li>
     
    )) 
  } else if(userRole === 'FINANCE'){
    return FINANCE_ROUTES.map((link, i) => (
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

