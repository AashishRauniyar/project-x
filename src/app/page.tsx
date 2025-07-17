import Navbar from '@/components/ui/Navbar'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArticleHero from '@/components/ui/ArticleHero'
import TableOfContents from '@/components/ui/TableOfContents'
import ProductCard from '@/components/ui/ProductCard'
import ReviewSystem from '@/components/ui/ReviewSystem'
import Footer from '@/components/ui/Footer'
import StructuredData from '@/components/ui/StructuredData'
import { getAllPosts, getAllCategories } from '@/app/lib/wordpress'
import type { Post, Category } from '@/app/lib/wordpress.d'

// Review data for Beverly Hills MD products
const beverlyHillsMDReviews = [
  {
    id: "1",
    author: "Sarah M.",
    date: "December 10, 2024",
    rating: 5,
    title: "Amazing results after 4 weeks!",
    content: "I've been using the Lift + Firm Sculpting Cream for about a month now and I'm really impressed with the results. My skin feels firmer and the fine lines around my eyes have noticeably diminished.",
    verified: true
  },
  {
    id: "2", 
    author: "Jennifer K.",
    date: "December 8, 2024",
    rating: 4,
    title: "Good product, a bit pricey",
    content: "The Dark Spot Corrector definitely works - I've seen improvement in my age spots. The only downside is the price point, but the quality justifies it.",
    verified: true
  },
  {
    id: "3",
    author: "Maria L.",
    date: "December 5, 2024", 
    rating: 5,
    title: "Worth every penny",
    content: "I was skeptical about the price at first, but after using the Deep Wrinkle Filler for 6 weeks, I can say it's absolutely worth it. My wrinkles are much less visible.",
    verified: false
  },
  {
    id: "4",
    author: "Lisa P.",
    date: "December 3, 2024",
    rating: 4,
    title: "Effective but takes time",
    content: "Results are definitely there, but you need to be patient. It took about 5-6 weeks before I started seeing real changes in my skin texture and firmness.",
    verified: true
  }
];

// Product data for Beverly Hills MD review
const beverlyHillsMDProducts = [
  {
    id: "1",
    rank: 1,
    title: "Beverly Hills MD Lift + Firm Sculpting Cream",
    image: "/api/placeholder/300x200",
    price: "$89.95",
    shopUrl: "#",
    reviewUrl: "#",
    description: "An advanced anti-aging cream that combines powerful peptides with hydrating ingredients to lift, firm, and sculpt the skin for a more youthful appearance.",
    keyIngredients: ["Caffeine", "Vitamin C", "Peptides", "Hyaluronic Acid", "Retinol"],
    benefits: ["Reduces fine lines", "Firms skin", "Improves elasticity", "Hydrates deeply", "Brightens complexion"],
    rating: 4.8
  },
  {
    id: "2",
    rank: 2,
    title: "Beverly Hills MD Dark Spot Corrector",
    image: "/api/placeholder/300x200",
    price: "$69.95",
    shopUrl: "#",
    reviewUrl: "#",
    description: "A targeted treatment that helps fade dark spots and even skin tone using clinically-proven ingredients for brighter, more radiant skin.",
    keyIngredients: ["Kojic Acid", "Arbutin", "Vitamin E", "Niacinamide", "Alpha Arbutin"],
    benefits: ["Fades dark spots", "Evens skin tone", "Prevents pigmentation", "Brightens skin", "Anti-aging"],
    rating: 4.6
  },
  {
    id: "3",
    rank: 3,
    title: "Beverly Hills MD Deep Wrinkle Filler",
    image: "/api/placeholder/300x200",
    price: "$79.95",
    shopUrl: "#",
    reviewUrl: "#",
    description: "A powerful wrinkle-filling treatment that uses advanced peptides and hyaluronic acid to smooth deep lines and restore skin's youthful appearance.",
    keyIngredients: ["Acetyl Hexapeptide-8", "Palmitoyl Pentapeptide-4", "Sodium Hyaluronate", "Vitamin C", "Collagen"],
    benefits: ["Fills deep wrinkles", "Smooths skin texture", "Plumps skin", "Reduces aging signs", "Hydrates"],
    rating: 4.5
  }
];

const tableOfContentsItems = [
  { label: 'Beverly Hills MD Overview', href: '#overview' },
  { label: 'Top Rated Products', href: '#products' },
  { label: 'Key Ingredients Analysis', href: '#ingredients' },
  { label: 'Customer Reviews & Ratings', href: '#reviews' },
  { label: 'Pros & Cons', href: '#pros-cons' },
  { label: 'Final Verdict', href: '#conclusion' },
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Skincare', href: '/reviews/skincare' },
  { label: 'Beverly Hills MD Reviews', href: '/reviews/beverly-hills-md' },
];

interface HomePageProps {
  posts: Post[];
  categories: Category[];
}

async function getHomePageData(): Promise<HomePageProps> {
  try {
    const [posts, categories] = await Promise.all([
      getAllPosts().then(posts => posts.slice(0, 6)), // Get latest 6 posts
      getAllCategories().then(cats => cats.filter(cat => cat.name !== 'Uncategorized' && cat.count > 0))
    ]);

    return { posts, categories };
  } catch (error) {
    console.error('Failed to fetch WordPress data:', error);
    // Return fallback data if WordPress is not available
    return {
      posts: [],
      categories: []
    };
  }
}

export default async function Home() {
  const { posts, categories } = await getHomePageData();

  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <TableOfContents items={tableOfContentsItems} />
            </aside>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <ArticleHero 
                title="Beverly Hills MD Reviews: Comprehensive Analysis of Premium Skincare Products"
                description="In-depth review of Beverly Hills MD's top-rated anti-aging skincare products. Expert analysis of ingredients, effectiveness, customer satisfaction, and value proposition for luxury skincare enthusiasts."
                author={{
                  name: "Dr. Sarah Mitchell",
                  href: "/authors/dr-sarah-mitchell",
                  image: "/api/placeholder/48x48"
                }}
                reviewer={{
                  name: "Dr. James Rodriguez",
                  href: "/reviewers/dr-james-rodriguez",
                  credentials: "MD, Dermatologist",
                  image: "/api/placeholder/48x48"
                }}
                updatedDate="December 15, 2024"
                rating={4.6}
                reviewCount={247}
                isMedicallyCited={true}
                isFactChecked={true}
              />
              
              {/* Article Content Sections */}
              <section id="overview" className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Beverly Hills MD Overview</h2>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Beverly Hills MD has established itself as a prominent name in the luxury skincare industry, 
                    offering scientifically-formulated products that promise to deliver professional-grade results. 
                    Founded by plastic surgeons, the brand focuses on advanced anti-aging solutions that combine 
                    medical expertise with cosmetic innovation.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our comprehensive review analyzes the brand's most popular products, examining their ingredients, 
                    effectiveness, customer satisfaction, and overall value proposition. We've evaluated clinical 
                    studies, customer testimonials, and expert opinions to provide you with an unbiased assessment.
                  </p>
                  
                  {/* Dynamic Categories Section */}
                  {categories.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-6 mt-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Health Topics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.slice(0, 6).map((category) => (
                          <a
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="bg-white rounded-lg p-3 text-center hover:bg-blue-100 transition-colors border"
                          >
                            <div className="font-medium text-gray-900 text-sm">{category.name}</div>
                            <div className="text-xs text-gray-600">{category.count} articles</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
              
              {/* Featured Products */}
              <section id="products" className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Rated Beverly Hills MD Products</h2>
                <div className="space-y-8">
                  {beverlyHillsMDProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </section>
              
              {/* Dynamic WordPress Posts Section */}
              {posts.length > 0 && (
                <section className="bg-white rounded-lg p-8 shadow-sm">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Health & Wellness Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                      <article key={post.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={post._embedded["wp:featuredmedia"][0].source_url}
                              alt={post.title.rendered}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                            <a 
                              href={`/post/${post.slug}`}
                              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                            />
                          </h3>
                          <div 
                            className="text-gray-600 text-sm line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                          />
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <a
                              href={`/post/${post.slug}`}
                              className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
                            >
                              Read More →
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <a
                      href="/blog"
                      className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      View All Articles
                    </a>
                  </div>
                </section>
              )}
              
              {/* Ingredients Analysis */}
              <section id="ingredients" className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Ingredients Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-900 mb-4">Proven Ingredients</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <span className="text-green-600 text-lg">✓</span>
                        <div>
                          <strong className="text-green-900">Retinol</strong>
                          <p className="text-green-700 text-sm">Clinically proven to reduce fine lines and improve skin texture</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-600 text-lg">✓</span>
                        <div>
                          <strong className="text-green-900">Peptides</strong>
                          <p className="text-green-700 text-sm">Stimulate collagen production for firmer skin</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-600 text-lg">✓</span>
                        <div>
                          <strong className="text-green-900">Hyaluronic Acid</strong>
                          <p className="text-green-700 text-sm">Provides intense hydration and plumps skin</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Safety Profile</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-600 text-lg">🛡️</span>
                        <div>
                          <strong className="text-blue-900">Dermatologist Tested</strong>
                          <p className="text-blue-700 text-sm">All products undergo rigorous safety testing</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-600 text-lg">🌿</span>
                        <div>
                          <strong className="text-blue-900">Natural Extracts</strong>
                          <p className="text-blue-700 text-sm">Incorporates botanical ingredients for gentle care</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-600 text-lg">⚗️</span>
                        <div>
                          <strong className="text-blue-900">Clinical Grade</strong>
                          <p className="text-blue-700 text-sm">Formulated to medical-grade standards</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              
              {/* Pros and Cons */}
              <section id="pros-cons" className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Pros & Cons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                      <span className="text-2xl mr-2">✅</span>
                      Pros
                    </h3>
                    <ul className="space-y-3">
                      <li className="text-gray-700">• Developed by board-certified plastic surgeons</li>
                      <li className="text-gray-700">• High-quality, clinically-tested ingredients</li>
                      <li className="text-gray-700">• Excellent customer satisfaction ratings</li>
                      <li className="text-gray-700">• 60-day money-back guarantee</li>
                      <li className="text-gray-700">• Free shipping on orders over $50</li>
                      <li className="text-gray-700">• Comprehensive product line for all skin concerns</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
                      <span className="text-2xl mr-2">❌</span>
                      Cons
                    </h3>
                    <ul className="space-y-3">
                      <li className="text-gray-700">• Premium pricing may not suit all budgets</li>
                      <li className="text-gray-700">• Some products contain fragrances</li>
                      <li className="text-gray-700">• Results may take 4-6 weeks to become visible</li>
                      <li className="text-gray-700">• Limited availability in physical stores</li>
                      <li className="text-gray-700">• Auto-ship program can be difficult to cancel</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              {/* Reviews Section */}
              <section id="reviews">
                <ReviewSystem 
                  reviews={beverlyHillsMDReviews}
                  averageRating={4.6}
                  totalReviews={247}
                  productName="Beverly Hills MD Products"
                />
              </section>
              
              {/* Final Verdict */}
              <section id="conclusion" className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Final Verdict</h2>
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Overall Rating</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400 text-2xl">
                        {'★'.repeat(4)}{'☆'.repeat(1)}
                      </div>
                      <span className="text-xl font-bold text-gray-900">4.6/5.0</span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Beverly Hills MD products demonstrate a commitment to quality and efficacy that justifies their 
                    premium positioning in the skincare market. While the price point may be higher than drugstore 
                    alternatives, the clinical-grade formulations and impressive customer satisfaction rates make 
                    them a worthwhile investment for those serious about anti-aging skincare.
                  </p>
                  
                  <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                    <p className="text-green-800 font-medium">
                      <strong>Recommendation:</strong> Beverly Hills MD products are recommended for individuals 
                      seeking professional-grade skincare solutions with clinically-proven ingredients. Best 
                      suited for mature skin or those with specific anti-aging concerns.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
