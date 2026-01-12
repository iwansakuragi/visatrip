import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Packages from '@/components/Packages'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'


export const metadata = {
  title: 'Visa Trip - Layanan Visa Umroh Mandiri & Visa Wisata Terpercaya',
  description: 'Layanan visa umroh, visa umum, hotel, dan paket trip terpercaya untuk generasi yang ingin explore dunia dengan mudah dan aman.',
  keywords: 'visa umroh, visa umum, paket umroh, hotel umroh, travel umroh, umroh murah',
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Packages />
      <Testimonials />
      <Contact />
    </main>
  )
}