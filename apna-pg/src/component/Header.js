"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between pl-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-600">Apna PG</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-orange-600">
            Home
          </Link>
          <Link href="/listings" className="text-sm font-medium transition-colors hover:text-orange-600">
            Listings
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-orange-600">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-orange-600">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4 pr-8" >
        <div className="flex space-x-4">
  <Button className="bg-orange-600 hover:bg-orange-700">Login</Button>
  <Button className="bg-white text-orange-600 border border-orange-600 hover:bg-orange-50">Sign Up</Button>
</div>

        </div>
      </div>
    </header>
  )
}
