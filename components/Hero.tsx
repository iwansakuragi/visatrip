'use client'

import { ArrowRight, MessageCircle, Star, Plane } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const whatsappNumber = '6281234567890'
  const whatsappMessage = 'Halo Visa Trip, saya tertarik dengan layanan Anda'

  return (
    <section 
      id="home" 
      className="pt-24 pb-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-sky-400 via-sky-500 to-orange-400 bg-clip-text text-transparent">
                Wujudkan Impian
              </span>
              <br />
              <span className="text-gray-800">Ibadah & Liburanmu</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-xl">
              Layanan visa umroh, visa umum, hotel, dan paket trip terpercaya untuk generasi yang ingin explore dunia dengan mudah dan aman.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#paket"
                className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-8 py-4 rounded-full hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center gap-2 font-semibold"
              >
                Lihat Paket
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-purple-500 text-purple-600 px-8 py-4 rounded-full hover:bg-purple-50 transition flex items-center justify-center gap-2 font-semibold"
              >
                <MessageCircle className="w-5 h-5" />
                Chat WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-purple-600">500+</div>
                <div className="text-gray-600">Jamaah Puas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">98%</div>
                <div className="text-gray-600">Approval Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">4.9</div>
                <div className="text-gray-600 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="flex-1 relative">
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300">

                {/* Hero Image */}
                <Image
                src="/images/Hero1.png"
                alt="Visa & Travel Service"
                fill
                priority
                className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-white text-center space-y-4">
                    <Plane className="w-20 h-20 mx-auto animate-bounce" />
                    <p className="text-2xl font-semibold">
                    Your Journey Starts Here
                    </p>
                </div>
                </div>

            </div>
          </div>


        </div>
      </div>
    </section>
  )
}