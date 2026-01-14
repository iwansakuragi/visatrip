import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import GoogleAnalytics from './GoogleAnalytics'
import MetaPixel from './MetaPixel'
import { localBusinessSchema } from './schema'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Visa Trip',
  description: 'Layanan Visa & Travel Terpercaya',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="id">
      <head>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} />
        <MetaPixel PIXEL_ID={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}