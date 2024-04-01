"use client"
import React, { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {FaBars} from "react-icons/fa"
import routes from "@/constants/routes";

export default function Sidebar()  {
  const pathname = usePathname()

  const [collapseShow, setCollapseShow] = React.useState("hidden");
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
              <li>
                {routes.map((link, i) => (
                  <Link href={link.path} key={i} className="flex text-whitegray text-[16px] font-[400] py-3 gap-4 cursor-pointer items-center hover:text-white">
                    {link.icon}{link.name}
                  </Link>
                ))}
              </li> 
            </ul>
          </div>
          <div className="mx-auto justify-center">
            <span className="block text-white text-center">Kizunice Academy</span>
            <span className="block text-[10px]">2024 © PT Kizuna Indonesia Nippon</span>
          </div>
        </div>
      </div>
    </div>
  )
}
