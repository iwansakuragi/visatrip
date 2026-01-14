import { query } from '@/lib/db'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowRight } from 'lucide-react'
import BlogSearch from './BlogSearch'
import CategoryFilter from './CategoryFilter'

// Metadata SEO
export const metadata = {
  title: 'Blog Visa Trip - Tips Umroh, Panduan Visa & Travel',
  description:
    'Baca artikel, tips, dan panduan lengkap seputar umroh, visa, dan travel dari Visa Trip.',
}

type BlogSearchParams = {
  category?: string
  search?: string
}

type BlogPageProps = {
  searchParams: Promise<BlogSearchParams>
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

// ===============================
// SERVER DATA FETCHING
// ===============================
async function getBlogPosts(params: BlogSearchParams): Promise<BlogPost[]> {
  const { category, search } = params

  let sql = `
    SELECT id, title, slug, excerpt, category, tags, author,
           featured_image, views, published_at
    FROM blog_posts
    WHERE status = 'published'
  `

  const values: any[] = []

  if (category) {
    values.push(category)
    sql += ` AND category = $${values.length}`
  }

  if (search) {
    values.push(`%${search}%`)
    sql += ` AND (title ILIKE $${values.length} OR excerpt ILIKE $${values.length})`
  }

  sql += ` ORDER BY published_at DESC LIMIT 50`

  try {
    const res = await query(sql, values)
    return res.rows
  } catch (err) {
    console.error('Error fetching posts:', err)
    return []
  }
}

async function getCategories() {
  const res = await query(
    'SELECT name, slug, post_count FROM blog_categories ORDER BY name'
  )
  return res.rows
}

// ===============================
// PAGE
// ===============================
export default async function BlogPage({ searchParams }: BlogPageProps) {
  // ✅ UNWRAP PROMISE SEKALI
  const params = await searchParams

  const posts = await getBlogPosts(params)
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-orange-50 to-blue-50">
      
      {/* HERO */}
      <section className="pt-32 pb-16 text-center">
        <h1 className="text-4xl font-bold text-orange-500">Blog Visa Trip</h1>
        <p className="text-sky-500 mt-3">
          Tips & panduan umroh, visa, dan travel
        </p>
      </section>

      {/* SEARCH & FILTER */}
      <section className="py-6 bg-white shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between">
          <BlogSearch />
          <CategoryFilter
            categories={categories}
            currentCategory={params.category ?? null}
          />
        </div>
      </section>

      {/* POSTS */}
      <section className="py-16">
        <div className="container mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">
              Tidak ada artikel ditemukan
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow hover:shadow-xl transition"
                >
                  <div className="h-48 bg-linear-to-br from-sky-400 flex items-center justify-center text-6xl">
                    📝
                  </div>

                  <div className="p-6">
                    <span className="text-sm bg-sky-100 text-sky-600 px-3 py-1 rounded-full">
                      {post.category}
                    </span>

                    <h2 className="text-xl font-bold mt-3">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mt-2 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex gap-4 text-sm text-gray-500 mt-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_at).toLocaleDateString('id-ID')}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>

                    {post.tags && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-xs text-gray-600 flex gap-1">
                            <Tag className="w-3 h-3" /> {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 mt-4 text-sky-600 hover:text-orange-600"
                    >
                      Baca Selengkapnya <ArrowRight className="w-4 h-4" />
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
