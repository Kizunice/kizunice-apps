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
          <div className="mb-6 mx-auto items-center">
            <Image src="/logo.png" className="w-30" width={140} height={40} alt="Kizunice App Logo"/>
          </div>
          <div className="mb-auto">
            <ul>
            {routes.map((link) => (
              <li >
                <Link href={link.path} key={link.key} className="flex text-whitegray text-[16px] font-[400] py-3 gap-4 cursor-pointer items-center hover:text-white">
                  {link.icon}{link.name}
                </Link>
              </li>          
              ))}
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
