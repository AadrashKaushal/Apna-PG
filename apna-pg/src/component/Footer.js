import Link from "next/link"
import { Linkedin, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container grid gap-8 md:grid-cols-3 pl-8">
        <div>
          <h3 className="text-lg font-bold mb-4">About Apna PG</h3>
          <p className="text-gray-600">
            Apna PG is a platform dedicated to helping students and professionals find affordable and comfortable paying
            guest accommodations across India.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/listings" className="text-gray-600 hover:text-orange-600 transition-colors">
                Listings
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-orange-600 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-600 hover:text-orange-600 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <Link href="https://linkedin.com" className="text-gray-600 hover:text-orange-600 transition-colors">
              <Linkedin size={24} />
            </Link>
            <Link href="https://instagram.com" className="text-gray-600 hover:text-orange-600 transition-colors">
              <Instagram size={24} />
            </Link>
            <Link href="https://twitter.com" className="text-gray-600 hover:text-orange-600 transition-colors">
              <Twitter size={24} />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-600">&copy; {new Date().getFullYear()} Apna PG. All rights reserved.</p>
      </div>
    </footer>
  )
}
