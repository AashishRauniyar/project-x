import { Suspense } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon, TagIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { getAllPosts, getAllCategories } from '@/app/lib/wordpress'
import type { Post, Category } from '@/app/lib/wordpress.d'

// Function to get excerpt from content
function getExcerpt(content: string, wordLimit: number = 50): string {
  const plainText = content.replace(/<[^>]*>/g, '')
  const words = plainText.split(' ')
  if (words.length <= wordLimit) return plainText
  return words.slice(0, wordLimit).join(' ') + '...'
}

// Function to calculate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const plainText = content.replace(/<[^>]*>/g, '')
  const words = plainText.split(' ').length
  return Math.ceil(words / wordsPerMinute)
}

// Function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

async function BlogContent() {
  let posts: Post[] = []
  let categories: Category[] = []
  
  try {
    [posts, categories] = await Promise.all([
      getAllPosts(),
      getAllCategories()
    ])
  } catch (error) {
    console.error('Error fetching blog data:', error)
    // Fallback data
    posts = [
      {
        id: 1,
        title: { rendered: 'The Ultimate Guide to Natural Health Supplements' },
        content: { rendered: '<p>Discover the most effective natural supplements for optimal health and wellness. Learn about the science-backed benefits of vitamins, minerals, and herbal extracts that can transform your well-being...</p>' },
        excerpt: { rendered: 'Discover the most effective natural supplements for optimal health and wellness.' },
        date: '2024-01-15T10:00:00',
        slug: 'ultimate-guide-natural-health-supplements',
        categories: [15],
        featured_media: 0,
        link: '',
        status: 'publish' as const,
        type: 'post' as const,
        author: 1,
        comment_status: 'open' as const,
        ping_status: 'open' as const,
        sticky: false,
        template: '',
        format: 'standard' as const,
        meta: {},
        tags: [],
        yoast_head: '',
        yoast_head_json: {},
        _links: {}
      },
      {
        id: 2,
        title: { rendered: 'Top 10 Anti-Aging Skincare Ingredients You Need to Know' },
        content: { rendered: '<p>Aging is inevitable, but the right skincare ingredients can help slow down the process. From retinoids to vitamin C, discover the powerhouse ingredients that dermatologists swear by...</p>' },
        excerpt: { rendered: 'Aging is inevitable, but the right skincare ingredients can help slow down the process.' },
        date: '2024-01-12T14:30:00',
        slug: 'top-10-anti-aging-skincare-ingredients',
        categories: [2],
        featured_media: 0,
        link: '',
        status: 'publish' as const,
        type: 'post' as const,
        author: 1,
        comment_status: 'open' as const,
        ping_status: 'open' as const,
        sticky: false,
        template: '',
        format: 'standard' as const,
        meta: {},
        tags: [],
        yoast_head: '',
        yoast_head_json: {},
        _links: {}
      },
      {
        id: 3,
        title: { rendered: 'Managing Blood Sugar Naturally: Evidence-Based Strategies' },
        content: { rendered: '<p>Maintaining healthy blood sugar levels is crucial for overall health. Learn about natural methods, dietary changes, and lifestyle modifications that can help stabilize your glucose levels...</p>' },
        excerpt: { rendered: 'Maintaining healthy blood sugar levels is crucial for overall health.' },
        date: '2024-01-10T09:15:00',
        slug: 'managing-blood-sugar-naturally',
        categories: [17],
        featured_media: 0,
        link: '',
        status: 'publish' as const,
        type: 'post' as const,
        author: 1,
        comment_status: 'open' as const,
        ping_status: 'open' as const,
        sticky: false,
        template: '',
        format: 'standard' as const,
        meta: {},
        tags: [],
        yoast_head: '',
        yoast_head_json: {},
        _links: {}
      }
    ]
  }

  // Get category names for display
  const getCategoryName = (categoryId: number): string => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : 'Health'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Health & Wellness Blog
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Expert insights, evidence-based articles, and the latest discoveries in health, wellness, and nutrition
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                className="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-300"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/blog"
              className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              All Articles
            </Link>
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 hover:border-primary-300 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Article Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                <div className="text-primary-600 text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {post.title.rendered.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm font-medium">Featured Article</p>
                </div>
              </div>

              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <TagIcon className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-medium text-primary-600">
                    {post.categories.length > 0 ? getCategoryName(post.categories[0]) : 'Health'}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  <Link href={`/post/${post.slug}`}>
                    {post.title.rendered}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt.rendered ? 
                    post.excerpt.rendered.replace(/<[^>]*>/g, '') : 
                    getExcerpt(post.content.rendered)
                  }
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{getReadingTime(post.content.rendered)} min read</span>
                    </div>
                  </div>
                </div>

                {/* Read More Button */}
                <Link
                  href={`/post/${post.slug}`}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group/link"
                >
                  Read Full Article
                  <svg className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg">
            Load More Articles
          </button>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Health Tips</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Get the latest health insights, expert reviews, and wellness tips delivered straight to your inbox every week.
          </p>
          <Link
            href="/newsletter"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  )
}

export const metadata = {
  title: 'Health & Wellness Blog - Healthy Lifestyle Tips',
  description: 'Expert insights, evidence-based articles, and the latest discoveries in health, wellness, and nutrition. Stay informed with our comprehensive health blog.',
  keywords: 'health blog, wellness articles, nutrition tips, supplement reviews, healthy lifestyle'
} 