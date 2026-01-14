'use client'

import Link from 'next/link'
import { Plane, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    layanan: [
      { name: 'Visa Umroh', href: '#layanan' },
      { name: 'Visa Umum', href: '#layanan' },
      { name: 'Hotel Umroh', href: '#layanan' },
      { name: 'Transportasi', href: '#layanan' },
      { name: 'Paket Custom', href: '#paket' }
    ],
    perusahaan: [
      { name: 'Tentang Kami', href: '#home' },
      { name: 'Testimoni', href: '#testimoni' },
      { name: 'Blog', href: '#blog' },
      { name: 'Kontak', href: '#kontak' },
      { name: 'FAQ', href: '#home' },
      { name: 'Blog', href: '#home' }
    ],
    legal: [
      { name: 'Syarat & Ketentuan', href: '#home' },
      { name: 'Kebijakan Privasi', href: '#home' },
      { name: 'Kebijakan Refund', href: '#home' }
    ]
  }

  const socialMedia = [
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: '#', color: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: '#', color: 'hover:bg-pink-600' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '#', color: 'hover:bg-blue-400' },
    { name: 'Youtube', icon: <Youtube className="w-5 h-5" />, href: '#', color: 'hover:bg-red-600' }
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-gray-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
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
            <p className="text-sm mb-6 leading-relaxed">
              Mitra terpercaya untuk perjalanan ibadah dan liburanmu ke seluruh dunia. 
              Berpengalaman sejak 2015 melayani ribuan jamaah dengan profesional dan amanah.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3">
              {socialMedia.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.color} transition`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Layanan Column */}
          <div>
            <h4 className="font-bold text-white mb-4">Layanan</h4>
            <ul className="space-y-2">
              {footerLinks.layanan.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-sm hover:text-purple-400 transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan Column */}
          <div>
            <h4 className="font-bold text-white mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              {footerLinks.perusahaan.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-sm hover:text-purple-400 transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-sm hover:text-purple-400 transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <a 
              href="https://g.page/r/12798011063785008940/review"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-purple-400 transition"
            >
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Google Verified ⭐</span>
            </a>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">
            &copy; {currentYear} Visa Trip. All rights reserved. Made with ❤️ for your journey.
          </p>
          
          {/* Certifications/Badges */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Terdaftar Resmi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Terpercaya</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>ISO Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}