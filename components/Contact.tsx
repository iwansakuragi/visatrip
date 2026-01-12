'use client'

import { MessageCircle, Mail, MapPin, Phone, Clock } from 'lucide-react'
import ContactForm from './ContactForm'

export default function Contact() {
  const whatsappNumber = '6281234567890'
  const whatsappMessage = 'Halo Visa Trip, saya ingin konsultasi'

  const contactInfo = [
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: 'WhatsApp',
      detail: '+62 812-3456-7890',
      link: `https://wa.me/${whatsappNumber}`,
      linkText: 'Chat Sekarang',
    },
    {
      icon: <Phone className="w-12 h-12" />,
      title: 'Telepon',
      detail: '+62 21-1234-5678',
      link: 'tel:+622112345678',
      linkText: 'Hubungi Kami',
    },
    {
      icon: <Mail className="w-12 h-12" />,
      title: 'Email',
      detail: 'info@visatrip.com',
      link: 'mailto:info@visatrip.com',
      linkText: 'Kirim Email',
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: 'Alamat',
      detail: 'Jl. Sudirman No. 123, Jakarta Selatan 12190',
      link: 'https://maps.google.com',
      linkText: 'Lihat Maps',
    },
  ]

  const officeHours = [
    { day: 'Senin - Jumat', time: '09:00 - 18:00 WIB' },
    { day: 'Sabtu', time: '09:00 - 15:00 WIB' },
    { day: 'Minggu', time: 'Tutup' },
  ]

  return (
    <section
      id="kontak"
      className="py-20 px-4 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900"
    >
      <div className="container mx-auto">

        {/* ===== HEADER ===== */}
        <div className="text-center mb-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hubungi Kami
          </h2>
          <p className="text-purple-200 text-lg">
            Tim kami siap membantu mewujudkan perjalanan impianmu
          </p>
        </div>

        <div className="mb-16">
          <ContactForm />
        </div>

        {/* ===== CONTACT CARDS ===== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {contactInfo.map((contact, idx) => (
            <div
              key={idx}
              className="bg-white bg-opacity-90 text-gray-800 backdrop-blur rounded-2xl p-6 text-center transition hover:bg-opacity-100"
            >
              <div className="flex justify-center mb-4 text-purple-600">
                {contact.icon}
              </div>

              <h3 className="font-bold text-lg mb-2">
                {contact.title}
              </h3>

              <p className="text-gray-600 mb-4 text-sm break-words">
                {contact.detail}
              </p>

              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition"
              >
                {contact.linkText}
              </a>
            </div>
          ))}
        </div>

        {/* ===== OFFICE HOURS ===== */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white bg-opacity-90 text-gray-800 backdrop-blur rounded-2xl p-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-bold">
                Jam Operasional
              </h3>
            </div>

            <div className="space-y-3">
              {officeHours.map((schedule, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                >
                  <span className="text-gray-600">
                    {schedule.day}
                  </span>
                  <span className="font-semibold">
                    {schedule.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="text-center text-white">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 px-12 py-4 rounded-full hover:shadow-2xl transition transform hover:scale-105 font-bold text-lg"
          >
            Mulai Konsultasi Gratis
          </a>
          <p className="text-purple-200 mt-4 text-sm">
            Respon cepat dalam 5 menit • Gratis tanpa komitmen
          </p>
        </div>

      </div>
    </section>
  )
}
