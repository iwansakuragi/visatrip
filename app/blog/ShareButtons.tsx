'use client'

import { Share2, MessageCircle, Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react'
import { useState } from 'react'

type ShareButtonsProps = {
  title: string
  slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState<boolean>(false)

  // Build full URL (safe for SSR)
  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/blog/${slug}`
      : `https://visatrip.com/blog/${slug}`

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks: Record<string, string> = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="mb-12 pb-8 border-b">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-gray-600" />
        <span className="font-semibold text-gray-700">Bagikan Artikel:</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition font-semibold text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition font-semibold text-sm"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </a>

        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-full hover:bg-sky-600 transition font-semibold text-sm"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition font-semibold text-sm"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>

        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition font-semibold text-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Tersalin!
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  )
}
