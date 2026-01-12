'use client'

import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Siti Aminah',
      rating: 5,
      text: 'Pelayanan cepat dan ramah! Visa umroh saya disetujui dalam 4 hari. Recommended banget!',
      location: 'Jakarta'
    },
    {
      name: 'Ahmad Fauzi',
      rating: 5,
      text: 'Paket umrohnya worth it, hotel strategis dan guide sangat membantu. Terima kasih Visa Trip!',
      location: 'Bandung'
    },
    {
      name: 'Dewi Safitri',
      rating: 5,
      text: 'First time umroh dan Visa Trip membantu dari A-Z. Prosesnya mudah dan transparan.',
      location: 'Surabaya'
    },
    {
      name: 'Budi Santoso',
      rating: 5,
      text: 'Sudah 3x pakai jasa Visa Trip untuk visa turis ke berbagai negara. Selalu lancar!',
      location: 'Yogyakarta'
    },
    {
      name: 'Nur Hasanah',
      rating: 5,
      text: 'CS-nya responsif banget! Semua pertanyaan dijawab dengan detail. Puas dengan pelayanannya.',
      location: 'Semarang'
    },
    {
      name: 'Rizki Pratama',
      rating: 5,
      text: 'Harga kompetitif, pelayanan maksimal. Umroh bareng keluarga jadi lebih tenang.',
      location: 'Medan'
    },
    {
      name: 'Fatimah Zahra',
      rating: 5,
      text: 'Hotel dekat Masjidil Haram, jalan kaki cuma 5 menit. Pokoknya the best deh!',
      location: 'Makassar'
    },
    {
      name: 'Andi Wijaya',
      rating: 5,
      text: 'Dokumentasi lengkap, tracking jelas, tim profesional. Definitely will use again!',
      location: 'Bali'
    }
  ]

  return (
    <section id="testimoni" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Kata Mereka
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Testimoni dari para jamaah dan pelanggan yang puas
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-1 border border-purple-100"
            >
              {/* Stars Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="border-t border-purple-200 pt-4">
                <div className="font-semibold text-purple-600">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Rating Summary */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-8 py-4 rounded-full">
            <div className="flex items-center gap-1">
              <Star className="w-7 h-7 fill-yellow-400 text-yellow-400" />
              <Star className="w-7 h-7 fill-yellow-400 text-yellow-400" />
              <Star className="w-7 h-7 fill-yellow-400 text-yellow-400" />
              <Star className="w-7 h-7 fill-yellow-400 text-yellow-400" />
              <Star className="w-7 h-7 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="border-l-2 border-purple-300 pl-3">
              <span className="font-bold text-3xl text-purple-600">4.9</span>
              <span className="text-gray-600 ml-2">dari 500+ review di Google</span>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Real Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Updated Daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}