'use client'

import { CheckCircle } from 'lucide-react'

export default function Packages() {
  const whatsappNumber = '6281234567890'

  const packages = [
    {
      name: 'Paket Umroh Ekonomis',
      duration: '9 Hari',
      price: '22.500.000',
      popular: false,
      features: [
        'Tiket PP',
        'Hotel bintang 3',
        'Visa & handling',
        'Makan 3x',
        'Tour guide',
        'Perlengkapan umroh'
      ]
    },
    {
      name: 'Paket Umroh Plus Turki',
      duration: '12 Hari',
      price: '35.000.000',
      popular: true,
      features: [
        'Tiket PP',
        'Hotel bintang 4',
        'Visa & handling',
        'Makan 3x',
        'Tour Turki 3 hari',
        'City tour'
      ]
    },
    {
      name: 'Paket Umroh VIP',
      duration: '12 Hari',
      price: '45.000.000',
      popular: false,
      features: [
        'Tiket PP business',
        'Hotel bintang 5',
        'Visa & handling',
        'Makan premium',
        'Private guide',
        'Exclusive facilities'
      ]
    }
  ]

  return (
    <section id="paket" className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Paket Umroh Terbaik
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan dan budgetmu
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 ${
                pkg.popular ? 'ring-4 ring-purple-500 md:scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
              )}

              {/* Package Name */}
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                {pkg.name}
              </h3>

              {/* Duration */}
              <div className="text-gray-600 mb-4">{pkg.duration}</div>

              {/* Price */}
              <div className="text-4xl font-bold text-purple-600 mb-6">
                Rp {parseInt(pkg.price).toLocaleString('id-ID')}
                <span className="text-sm text-gray-500 font-normal">/pax</span>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${pkg.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center px-6 py-4 rounded-full font-semibold transition ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                }`}
              >
                Pilih Paket
              </a>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Butuh paket custom atau punya pertanyaan?
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo, saya ingin konsultasi paket umroh custom')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold border-2 border-purple-500 hover:bg-purple-50 transition"
          >
            Konsultasi Paket Custom
          </a>
        </div>
      </div>
    </section>
  )
}