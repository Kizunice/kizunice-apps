"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {ROUTES, ADMIN_ROUTES, SENSEI_ROUTES, FINANCE_ROUTES, MASTER_ROUTES, DOK_ROUTES, PARTNER_ROUTES} from "@/constants/routes"
import { useSession } from "next-auth/react";
import LogoINA from "../../../public/Logo-INA-Icon.png"
import moment from "moment";

export default function Sidebar()  {
  const {data:session} = useSession()
  const userRole = session?.user.role
  const path = usePathname();
  
  const SidebarLink =({userRole}) => {
    if (userRole) {
      let navRoutes = []
      switch(userRole) {
        case "MASTER" : navRoutes.push(MASTER_ROUTES)
        break
        case "ADMIN" : navRoutes.push(ADMIN_ROUTES)
        break
        case "DOCUMENT" : navRoutes.push(DOK_ROUTES)
        break
        case "FINANCE" : navRoutes.push(FINANCE_ROUTES)
        break
        case "SENSEI" : navRoutes.push(SENSEI_ROUTES)
        break
        case "PARTNER" : navRoutes.push(PARTNER_ROUTES)
        break
        case "STUDENT" : navRoutes.push(ROUTES)
        break
      }
      return navRoutes[0].map((link, i) => (
        <li key={i}>
          {
            link.sub ? (
              <details>
                <summary className="flex text-white text-[16px] font-[400] py-3 gap-4 cursor-pointer items-center hover:text-white">
                  {link.icon} {link.name}
                </summary>
                <ul>
                  {link.sub.map((s, i) => (
                    <li key={i} >
                      <Link href={s.path} key={i} className={`${s.path === path ? "bg-tersier" : "bg-secondary"} flex text-white text-[14px] font-[400] py-2 gap-4 cursor-pointer items-center hover:text-white`}>
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <Link href={link.path} key={i} className={`${link.path === path ? "bg-tersier" : "bg-secondary"} flex text-white text-[16px] font-[400] py-3 gap-4 cursor-pointer items-center hover:text-white`}>
                {link.icon}{link.name}
              </Link>
            )
          }
        </li>
      )) 
    }
  }

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
              <SidebarLink userRole={userRole}/>
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