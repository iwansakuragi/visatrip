import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

/* ================= TYPES ================= */

type RelatedPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  published_at: string
}

type RelatedPostsProps = {
  posts: RelatedPost[]
}

/* ================= COMPONENT ================= */

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Artikel Terkait
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post: RelatedPost) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {/* Featured Image Placeholder */}
              <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-5xl">
                📝
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Category Badge */}
                <div className="mb-2">
                  <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(post.published_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-purple-600 font-semibold hover:text-pink-600 transition text-sm"
                >
                  Baca Artikel
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
