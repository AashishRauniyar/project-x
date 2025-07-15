import { getAllCategories, getPostsByCategory } from "./lib/wordpress";
import Link from "next/link";
import { Category, Post } from "./lib/wordpress.d";

export default async function Home() {
  const allCategories = await getAllCategories();

  // Filter out the "Uncategorized" category
  const filteredCategories = allCategories.filter(
    (category: Category) => category.slug !== "uncategorized"
  );

  const categoriesWithPosts = await Promise.all(
    filteredCategories.map(async (category) => {
      const posts = await getPostsByCategory(category.id);
      return { ...category, posts };
    })
  );

  // Get featured posts from first category for hero section
  const featuredPosts = categoriesWithPosts[0]?.posts.slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted Health Reviews, Expert Advice & Quality Insights
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Your premier source for evidence-based health and wellness information and unbiased product reviews.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex">
              <input
                type="text"
                placeholder="Search health topics, products, or reviews..."
                className="flex-1 px-6 py-4 text-gray-800 text-lg rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-r-full font-semibold transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-blue-600">1K+</h3>
              <p className="text-gray-600">Products Reviewed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-600">500+</h3>
              <p className="text-gray-600">Expert Articles</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-purple-600">50+</h3>
              <p className="text-gray-600">Health Categories</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-orange-600">10K+</h3>
              <p className="text-gray-600">Monthly Readers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Health Categories</h2>
            <Link href="/categories" className="text-blue-600 hover:text-blue-800 font-semibold">
              VIEW ALL →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categoriesWithPosts.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 truncate">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.posts.length} articles</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Featured Articles</h2>
              <Link href="/articles" className="text-blue-600 hover:text-blue-800 font-semibold">
                VIEW ALL →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post: Post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={post._embedded["wp:featuredmedia"][0].source_url}
                        alt={post.title.rendered}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 overflow-hidden">
                      <Link
                        href={`/post/${post.slug}`}
                        className="hover:text-blue-600 transition-colors block truncate"
                      >
                        {post.title.rendered}
                      </Link>
                    </h3>
                    <div
                      className="text-gray-600 mb-4 overflow-hidden text-ellipsis"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Health Expert</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★★★★★</span>
                        <span className="ml-1 text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Sections by Category */}
      {categoriesWithPosts.map((category) => {
        if (category.posts.length === 0) return null;
        
        return (
          <section key={category.id} className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">{category.name}</h2>
                <Link
                  href={`/category/${category.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  VIEW ALL →
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.posts.slice(0, 3).map((post: Post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={post._embedded["wp:featuredmedia"][0].source_url}
                          alt={post.title.rendered}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        <Link
                          href={`/post/${post.slug}`}
                          className="hover:text-blue-600 transition-colors block truncate"
                        >
                          {post.title.rendered}
                        </Link>
                      </h3>
                      <div
                        className="text-gray-600 mb-4 overflow-hidden text-ellipsis"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-600 font-medium">Read More</span>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★★★★★</span>
                          <span className="ml-1 text-sm text-gray-600">4.7</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Health Insights</h2>
            <p className="text-xl mb-8 opacity-90">
              Get expert health tips, product reviews, and wellness advice delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full font-semibold transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-4 opacity-75">
              Spam-free newsletters directly from our health experts. Your privacy is important to us.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Trust Our Content?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert Authors</h3>
              <p className="text-gray-600 text-sm">Written by certified health professionals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Evidence-Based</h3>
              <p className="text-gray-600 text-sm">Backed by scientific research and studies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Fact-Checked</h3>
              <p className="text-gray-600 text-sm">Reviewed by medical professionals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Up-to-Date</h3>
              <p className="text-gray-600 text-sm">Regularly updated with latest findings</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
