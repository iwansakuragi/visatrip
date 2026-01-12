'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const whatsappNumber = '6281234567890'
  const whatsappMessage = 'Halo Visa Trip, saya tertarik dengan layanan Anda'

  // Show button after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Show tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 z-50 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        aria-label="Chat WhatsApp"
        onMouseEnter={() => setShowTooltip(false)}
      >
        <MessageCircle className="w-8 h-8 animate-pulse" />
      </a>

      {/* Tooltip */}
      {showTooltip && isVisible && (
        <div className="fixed bottom-24 right-6 z-50 animate-bounce">
          <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-xs relative">
            {/* Close button */}
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-900 transition"
              aria-label="Close tooltip"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Tooltip content */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-1">
                  Butuh bantuan?
                </p>
                <p className="text-sm text-gray-600">
                  Chat dengan kami sekarang! Respon dalam 5 menit
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45"></div>
          </div>
        </div>
      )}
    </>
  )
}