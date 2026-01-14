import { query } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowLeft, Eye } from 'lucide-react'
import ShareButtons from '../ShareButtons'
import RelatedPosts from '../RelatedPosts'

/* ================= TYPES ================= */

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[] | null
  author: string
  views: number
  featured_image?: string | null
  published_at: string
}

type RelatedPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  published_at: string
}

type PageProps = {
  params: {
    slug: string
  }
}

/* ================= METADATA ================= */

export async function generateMetadata({ params }: PageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    return { title: 'Article Not Found' }
  }

  return {
    title: `${post.title} | Blog Visa Trip`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author],
      tags: post.tags ?? [],
    },
  }
}

/* ================= DATA ================= */

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const result = await query(
      `SELECT * FROM blog_posts WHERE slug = $1 AND status = 'published'`,
      [slug]
    )

    if (result.rows.length === 0) return null

    await query(
      'UPDATE blog_posts SET views = views + 1 WHERE slug = $1',
      [slug]
    )

    return result.rows[0] as BlogPost
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

async function getRelatedPosts(
  category: string,
  currentSlug: string
): Promise<RelatedPost[]> {
  try {
    const result = await query(
      `SELECT id, title, slug, excerpt, category, published_at
       FROM blog_posts 
       WHERE status = 'published'
         AND category = $1
         AND slug != $2
       ORDER BY published_at DESC
       LIMIT 3`,
      [category, currentSlug]
    )

    return result.rows as RelatedPost[]
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

/* ================= PAGE ================= */

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.slug)

  if (!post) notFound()

  const relatedPosts = await getRelatedPosts(post.category, post.slug)

  return (
    <div className="min-h-screen bg-white">
      {/* Back */}
      <div className="pt-24 pb-8 px-4 bg-linear-to-br from-sky-50 to-orange-50">
        <div className="container mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-orange-600 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Blog
          </Link>
        </div>
      </div>

      <article className="pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <span className="inline-block mb-4 bg-sky-100 text-sky-600 px-4 py-2 rounded-full text-sm font-semibold">
            {post.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-gray-600 mb-6 pb-6 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(post.published_at).toLocaleDateString('id-ID')}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {post.views} views
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 bg-gray-100 px-4 py-2 rounded-full text-sm"
                >
                  <Tag className="w-4 h-4" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </article>

      {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
    </div>
  )
}
