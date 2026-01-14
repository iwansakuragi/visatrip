'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

/* ================= TYPES ================= */

type Category = {
  slug: string
  name: string
  post_count: number
}

type CategoryFilterProps = {
  categories: Category[]
  currentCategory: string | null
}

/* ================= COMPONENT ================= */

export default function CategoryFilter({
  categories,
  currentCategory,
}: CategoryFilterProps) {
  const searchParams = useSearchParams()
  const search: string | null = searchParams.get('search')

  const buildUrl = (categoryName: string | null): string => {
    const params = new URLSearchParams()

    if (categoryName) params.set('category', categoryName)
    if (search) params.set('search', search)

    const queryString = params.toString()
    return `/blog${queryString ? `?${queryString}` : ''}`
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* ALL */}
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full font-semibold transition ${
          !currentCategory
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Semua
      </Link>

      {/* CATEGORIES */}
      {categories.map((category: Category) => (
        <Link
          key={category.slug}
          href={buildUrl(category.name)}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            currentCategory === category.name
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
          {category.post_count > 0 && (
            <span className="ml-1 text-xs opacity-75">
              ({category.post_count})
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}
