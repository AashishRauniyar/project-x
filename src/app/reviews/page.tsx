import { Suspense } from 'react'
import Link from 'next/link'
import { StarIcon, TagIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'

// Mock review data - in real app this would come from WordPress
const reviewCategories = [
  {
    id: 1,
    name: 'Supplements',
    slug: 'supplements',
    description: 'In-depth reviews of health supplements and vitamins',
    count: 45,
    icon: '💊'
  },
  {
    id: 2,
    name: 'Skincare',
    slug: 'skincare',
    description: 'Professional reviews of skincare products and treatments',
    count: 32,
    icon: '🧴'
  },
  {
    id: 3,
    name: 'Fitness Equipment',
    slug: 'fitness',
    description: 'Reviews of home fitness equipment and accessories',
    count: 28,
    icon: '🏋️'
  },
  {
    id: 4,
    name: 'Health Devices',
    slug: 'devices',
    description: 'Reviews of health monitoring devices and gadgets',
    count: 18,
    icon: '📱'
  }
]

const featuredReviews = [
  {
    id: 1,
    title: 'TriFlexarin Joint Health Supplement',
    category: 'Supplements',
    rating: 4.2,
    pros: ['Natural ingredients', 'Clinically tested', 'Good value'],
    cons: ['Takes time to see results', 'Large pills'],
    summary: 'A solid joint health supplement with proven ingredients and reasonable pricing.',
    image: 'T',
    slug: 'triflexarin-review',
    reviewDate: '2024-01-15',
    verified: true
  },
  {
    id: 2,
    title: 'Beverly Hills MD Lift + Firm Sculpting Cream',
    category: 'Skincare',
    rating: 3.8,
    pros: ['Luxurious texture', 'Visible firming', 'Premium packaging'],
    cons: ['Expensive', 'Strong fragrance', 'Not suitable for sensitive skin'],
    summary: 'High-end anti-aging cream with good results but comes at a premium price.',
    image: 'B',
    slug: 'beverly-hills-md-lift-firm-review',
    reviewDate: '2024-01-12',
    verified: true
  },
  {
    id: 3,
    title: 'Blood Sugar Premier by Zenith Labs',
    category: 'Supplements',
    rating: 4.5,
    pros: ['Effective formula', 'Natural ingredients', 'Good customer support'],
    cons: ['Only available online', 'Pricey for some'],
    summary: 'Excellent blood sugar support supplement with impressive customer results.',
    image: 'B',
    slug: 'blood-sugar-premier-review',
    reviewDate: '2024-01-10',
    verified: true
  }
]

// Component for star rating display
function StarRating({ rating, className = "" }: { rating: number, className?: string }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
        } else if (i === fullStars && hasHalfStar) {
          return (
            <div key={i} className="relative">
              <StarIconOutline className="w-5 h-5 text-gray-300" />
              <StarIcon className="w-5 h-5 text-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
            </div>
          )
        } else {
          return <StarIconOutline key={i} className="w-5 h-5 text-gray-300" />
        }
      })}
      <span className="ml-2 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
    </div>
  )
}

async function ReviewsContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Expert Product Reviews
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Honest, unbiased reviews of health and wellness products by our team of experts
            </p>
            <div className="flex items-center justify-center gap-2 text-primary-100">
              <ShieldCheckIcon className="w-6 h-6" />
              <span className="font-medium">Verified • Unbiased • Evidence-Based</span>
            </div>
          </div>
        </div>
      </div>

      {/* Review Categories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Reviews by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find detailed reviews and ratings for products across different health and wellness categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reviewCategories.map((category) => (
            <Link
              key={category.id}
              href={`/reviews/${category.slug}`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex items-center justify-center gap-2 text-primary-600">
                  <span className="font-semibold">{category.count} Reviews</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Reviews */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Reviews</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most comprehensive and popular product reviews with detailed analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredReviews.map((review) => (
              <article key={review.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Product Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                  <div className="text-primary-600 text-center">
                    <div className="w-20 h-20 mx-auto mb-2 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-3xl">{review.image}</span>
                    </div>
                    <p className="text-sm font-medium">Product Review</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Category and Verified Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TagIcon className="w-4 h-4 text-primary-600" />
                      <span className="text-sm font-medium text-primary-600">{review.category}</span>
                    </div>
                    {review.verified && (
                      <div className="flex items-center gap-1 text-green-600">
                        <ShieldCheckIcon className="w-4 h-4" />
                        <span className="text-xs font-medium">Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Title and Rating */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    <Link href={`/post/${review.slug}`}>{review.title}</Link>
                  </h3>

                  <StarRating rating={review.rating} className="mb-4" />

                  {/* Summary */}
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {review.summary}
                  </p>

                  {/* Pros and Cons */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-green-700 mb-1">Pros:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {review.pros.slice(0, 2).map((pro, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <span className="text-green-500">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-red-700 mb-1">Cons:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {review.cons.slice(0, 2).map((con, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <span className="text-red-500">✗</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Review Date */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                    <ClockIcon className="w-4 h-4" />
                    <span>Reviewed on {new Date(review.reviewDate).toLocaleDateString()}</span>
                  </div>

                  {/* Read Full Review Button */}
                  <Link
                    href={`/post/${review.slug}`}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group/link w-full justify-center bg-primary-50 py-2 px-4 rounded-lg hover:bg-primary-100"
                  >
                    Read Full Review
                    <svg className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* How We Review Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Review Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn about our rigorous testing and evaluation process that ensures you get honest, reliable reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Research</h3>
              <p className="text-sm text-gray-600">We thoroughly research ingredients, company background, and scientific studies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧪</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Testing</h3>
              <p className="text-sm text-gray-600">Our experts personally test products for effectiveness and safety</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Analysis</h3>
              <p className="text-sm text-gray-600">We analyze results, compare with alternatives, and evaluate value</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Review</h3>
              <p className="text-sm text-gray-600">We write comprehensive, unbiased reviews with clear recommendations</p>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Get the Latest Reviews</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Be the first to know about new product reviews, exclusive deals, and health product recommendations.
          </p>
          <Link
            href="/newsletter"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
          >
            Subscribe for Review Updates
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    }>
      <ReviewsContent />
    </Suspense>
  )
}

export const metadata = {
  title: 'Expert Product Reviews - Healthy Lifestyle Tips',
  description: 'Honest, unbiased reviews of health and wellness products by our team of experts. Find detailed analysis, ratings, and recommendations.',
  keywords: 'product reviews, supplement reviews, health product reviews, expert ratings, unbiased reviews'
} 