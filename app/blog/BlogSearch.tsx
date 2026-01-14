'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

export default function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('search') || ''
  )

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    if (searchQuery.trim()) {
      params.set('search', searchQuery)
    } else {
      params.delete('search')
    }

    router.push(`/blog?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Cari artikel..."
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full
                     focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
        />

        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2
                     bg-linear-to-br from-sky-500 to-orange-500
                     text-white px-6 py-2 rounded-full
                     hover:shadow-lg transition text-sm font-semibold"
        >
          Cari
        </button>
      </div>
    </form>
  )
}
