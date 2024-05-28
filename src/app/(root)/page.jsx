import Link from "next/link"
import Header from "@/components/landing/header"
import Hero from "@/components/landing/hero"
import About from "@/components/landing/about"
import Program from "@/components/landing/program"
export default function Home() {
  return (
    <div className="container">
      <Header/>
      <Hero/>
      <About/>
      <Program/>
    </div>
  )
}
