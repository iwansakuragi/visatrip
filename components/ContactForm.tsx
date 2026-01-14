'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    message: '',
  })

  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const serviceTypes = [
    'Visa Umroh',
    'Visa Umum',
    'Hotel Umroh',
    'Transportasi',
    'Paket Umroh',
    'Paket Custom',
  ]

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error ?? 'Gagal mengirim pesan')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_type: '',
        message: '',
      })

      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Terjadi kesalahan'
      )
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold mb-2 bg-linear-to-r from-sky-500 to-orange-400 bg-clip-text text-transparent">
        Hubungi Kami
      </h3>
      <p className="text-gray-600 mb-6">
        Isi form di bawah dan tim kami akan menghubungi Anda segera
      </p>

      {/* SUCCESS */}
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-semibold text-green-800">Pesan Terkirim!</p>
            <p className="text-sm text-green-700">
              Tim kami akan segera merespons.
            </p>
          </div>
        </div>
      )}

      {/* ERROR */}
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800">Terjadi Kesalahan</p>
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nama Lengkap"
          className="text-gray-600 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className="text-gray-600 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="WhatsApp"
          className="text-gray-600 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500"
        />

        <select
          name="service_type"
          value={formData.service_type}
          onChange={handleChange}
          required
          className="text-gray-600 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500"
        >
          <option value="" className='text-gray-600'>Pilih layanan</option>
          {serviceTypes.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          placeholder="Pesan Anda"
          className="text-gray-600 w-full px-4 py-3 border rounded-xl resize-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-linear-to-r from-sky-500 to-orange-400
            text-white px-8 py-4 rounded-xl font-semibold
            transition hover:scale-105 disabled:opacity-50
            flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="text-gray-600 w-5 h-5 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Send className="text-gray-600 w-5 h-5" />
              Kirim Pesan
            </>
          )}
        </button>
      </form>
    </div>
  )
}
