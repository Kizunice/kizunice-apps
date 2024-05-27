import Link from "next/link"
import Header from "@/components/landing/header"
import Hero from "@/components/landing/hero"
export default function Home() {
  return (
    <div className="container">
      <Header/>
      <Hero/>
    </div>
  )
}
