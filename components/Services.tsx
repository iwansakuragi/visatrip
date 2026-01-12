'use client'

import { useState } from 'react'
import { Plane, Globe, Hotel, Bus, CheckCircle } from 'lucide-react'

export default function Services() {
  const [activeService, setActiveService] = useState('umroh')
  
  const whatsappNumber = '6281234567890'

  const services = [
    {
      id: 'umroh',
      icon: <Plane className="w-8 h-8" />,
      title: 'Visa Umroh',
      description: 'Proses cepat, dokumen mudah, harga terjangkau',
      price: 'Mulai 2.5jt',
      features: ['Proses 3-5 hari kerja', 'Free konsultasi', 'Garansi approve']
    },
    {
      id: 'general',
      icon: <Globe className="w-8 h-8" />,
      title: 'Visa Umum',
      description: 'Visa turis berbagai negara dengan layanan terpercaya',
      price: 'Mulai 1.8jt',
      features: ['50+ negara tersedia', 'Bantuan dokumen lengkap', 'Track status online']
    },
    {
      id: 'hotel',
      icon: <Hotel className="w-8 h-8" />,
      title: 'Hotel Umroh',
      description: 'Hotel strategis dekat Masjidil Haram & Nabawi',
      price: 'Mulai 800rb/malam',
      features: ['Jarak walking distance', 'Bintang 3-5', 'Breakfast included']
    },
    {
      id: 'transport',
      icon: <Bus className="w-8 h-8" />,
      title: 'Transportasi',
      description: 'Bus pariwisata nyaman untuk perjalanan ibadah Anda',
      price: 'Mulai 3jt/hari',
      features: ['AC & Wifi', 'Driver berpengalaman', 'Full insurance']
    }
  ]

  return (
    <section id="layanan" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-sky-600 to-orange-600 bg-clip-text text-transparent">
              Layanan Kami
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Solusi lengkap untuk semua kebutuhan perjalanan ibadah dan liburanmu
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer border border-purple-100"
              onMouseEnter={() => setActiveService(service.id)}
            >
              {/* Icon */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>

              {/* Price */}
              <div className="text-2xl font-bold text-purple-600 mb-4">
                {service.price}
              </div>

              {/* Features List */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white text-orange-600 px-6 py-3 rounded-full hover:bg-orange-600 hover:text-white transition font-semibold border border-purple-200"
              >
                Pesan Sekarang
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}