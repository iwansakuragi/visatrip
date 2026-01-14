import { query } from '@/lib/db'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react'
import BlogSearch from './BlogSearch'
import CategoryFilter from './CategoryFilter'

// Metadata untuk SEO
export const metadata = {
  title: 'Blog Visa Trip - Tips Umroh, Panduan Visa & Travel',
  description: 'Baca artikel, tips, dan panduan lengkap seputar umroh, visa, dan travel dari Visa Trip. Update informasi terkini untuk perjalanan ibadah Anda.',
  keywords: 'blog umroh, tips umroh, panduan visa, travel blog, visa trip blog',
}

type BlogSearchParams = {
  category?: string
  search?: string
}

type BlogPageProps = {
  searchParams?: BlogSearchParams
}

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string[] | null
  author: string
  featured_image: string | null
  views: number
  published_at: string
}

// Server Component - Fetch data di server
async function getBlogPosts(searchParams?: BlogSearchParams): Promise<BlogPost[]> {
  const category = searchParams?.category || null
  const search = searchParams?.search || null
  
  let sqlQuery = `
    SELECT id, title, slug, excerpt, category, tags, author, 
           featured_image, views, published_at
    FROM blog_posts 
    WHERE status = 'published'
  `
  
  const params = []
  
  if (category) {
    params.push(category)
    sqlQuery += ` AND category = $${params.length}`
  }
  
  if (search) {
    params.push(`%${search}%`)
    sqlQuery += ` AND (title ILIKE $${params.length} OR excerpt ILIKE $${params.length})`
  }
  
  sqlQuery += ` ORDER BY published_at DESC LIMIT 50`
  
  try {
    const result = await query(sqlQuery, params)
    return result.rows
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

async function getCategories() {
  try {
    const result = await query(
      'SELECT name, slug, post_count FROM blog_categories ORDER BY name'
    )
    return result.rows
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = await getBlogPosts(searchParams)
  const categories = await getCategories()
  
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-orange-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-linear-to-br from-white text-orange-500">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog Visa Trip
          </h1>
          <p className="text-xl text-sky-500 max-w-2xl mx-auto">
            Tips, panduan, dan informasi terkini seputar umroh, visa, dan travel
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 px-4 bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <BlogSearch />
            <CategoryFilter categories={categories} currentCategory={searchParams?.category ?? null} />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                Tidak ada artikel yang ditemukan.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  {/* Featured Image */}
                  {post.featured_image ? (
                    <div className="relative h-48 bg-linear-to-br from-sky-400">
                      <div className="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-20">
                        📝
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-linear-to-br from-sky-400  flex items-center justify-center text-white text-6xl">
                      📝
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.published_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags?.slice(0, 3).map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-xs text-gray-600"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More Link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-orange-600 transition"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}