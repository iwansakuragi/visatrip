'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappNumber = '6281234567890'
  const whatsappMessage = 'Halo Visa Trip, saya tertarik dengan layanan Anda'

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#layanan', label: 'Layanan' },
    { href: '#paket', label: 'Paket' },
    { href: '#testimoni', label: 'Testimoni' },
    { href: '#kontak', label: 'Kontak' },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur shadow-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          {/* LOGO */}
            <Link
                href="/"
                className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
                >
                {/* Logo Mark */}
                <div className="relative transition-all duration-300 ${
                            isScrolled ? h-8 w-8 md:h-9 md:w-9">
                    <Image
                    src="/images/logo-mark.png" // versi icon / mark saja
                    alt="Visa Trip Logo"
                    fill
                    priority
                    className="object-contain"
                    />
                </div>

                {/* Brand Text */}
                <div className="text-1xl md:text-2xl font-bold leading-none tracking-tight">
                    <span className="text-sky-400 group-hover:text-sky-500 transition">
                    Visa
                    </span>{' '}
                    <span className="text-orange-400 group-hover:text-orange-500 transition">
                    Trip
                    </span>
                </div>
            </Link>


          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-gray-700 font-medium transition
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                  after:bg-gradient-to-r after:from-sky-500 after:to-orange-500
                  after:transition-all after:duration-300
                  hover:after:w-full hover:text-sky-600"
              >
                {link.label}
              </a>
            ))}

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-sky-500 to-orange-500
                text-white px-6 py-2 rounded-full font-semibold
                transition transform hover:scale-105 hover:shadow-lg"
            >
              Konsultasi Gratis
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="space-y-4 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-700 font-medium hover:text-sky-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-sky-500 via-cyan-500 to-orange-500
                text-white px-6 py-2 rounded-full text-center font-semibold"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>

      </nav>
    </header>
  )
}
