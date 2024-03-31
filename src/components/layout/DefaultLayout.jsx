"use client";
import React, { useState, useRef } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";

export default function DefaultLayout({children}) {
  const mainContentRef = useRef(null);
  return (
    <>
      <div className="drawer lg:drawer-open">
        <Sidebar />
        <div className="drawer-content flex flex-col">
          <Header/>
          <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6" ref={mainContentRef}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
