import { getCategoryBySlug, getPostsByCategorySlug } from "@/app/lib/wordpress";
import { Post, Category, Tag } from "@/app/lib/wordpress.d";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/ui/Footer";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const [category, posts] = await Promise.all([
      getCategoryBySlug(slug),
      getPostsByCategorySlug(slug),
    ]);

    if (!category) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
              <p className="text-gray-600 mb-8">The category you&apos;re looking for doesn&apos;t exist.</p>
              <Link
                href="/"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    const breadcrumbItems = [
      { label: 'Home', href: '/' },
      { label: 'Categories', href: '/categories' },
      { label: category.name, href: `/category/${category.slug}` },
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Category Header */}
          <div className="bg-white rounded-lg p-8 shadow-sm mt-6 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
              {category.description && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {category.description}
                </p>
              )}
              <div className="mt-4 inline-flex items-center bg-primary-50 rounded-full px-4 py-2">
                <span className="text-primary-700 font-medium">
                  {posts.length} {posts.length === 1 ? 'Article' : 'Articles'} in this category
                </span>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: Post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                >
                  {/* Featured Image */}
                  {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post._embedded["wp:featuredmedia"][0].source_url}
                        alt={post.title.rendered}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      <Link
                        href={`/post/${post.slug}`}
                        className="hover:text-primary-600 transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                    </h2>
                    
                    <div
                      className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    
                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <time className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      
                      {/* Author */}
                      {post._embedded?.author?.[0] && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{post._embedded.author[0].name}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Categories & Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post._embedded?.["wp:term"]?.[0]?.slice(0, 3).map((term: Category | Tag) => (
                        <Link
                          key={term.id}
                          href={`/category/${term.slug}`}
                          className="inline-block bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full hover:bg-primary-200 transition-colors"
                        >
                          {term.name}
                        </Link>
                      ))}
                    </div>
                    
                    {/* Read More Button */}
                    <Link
                      href={`/post/${post.slug}`}
                      className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group"
                    >
                      Read Full Article
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-12 shadow-sm text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
                             <p className="text-gray-600 mb-6">
                 There are no articles in the &quot;{category.name}&quot; category yet.
               </p>
              <Link
                href="/"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Explore Other Categories
              </Link>
            </div>
          )}

          {/* Related Categories */}
          <div className="mt-12 bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Explore More Topics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/category/health-wellness" className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 text-center transition-colors">
                <div className="text-primary-600 font-medium">Health & Wellness</div>
              </Link>
              <Link href="/category/nutrition" className="bg-secondary-50 hover:bg-secondary-100 rounded-lg p-4 text-center transition-colors">
                <div className="text-secondary-600 font-medium">Nutrition</div>
              </Link>
              <Link href="/category/supplements" className="bg-accent-50 hover:bg-accent-100 rounded-lg p-4 text-center transition-colors">
                <div className="text-accent-600 font-medium">Supplements</div>
              </Link>
              <Link href="/category/beauty" className="bg-neutral-50 hover:bg-neutral-100 rounded-lg p-4 text-center transition-colors">
                <div className="text-neutral-600 font-medium">Beauty</div>
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading category page:', error);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Loading Category</h1>
            <p className="text-gray-600 mb-8">
              We encountered an error while loading this category. Please check your WordPress connection.
            </p>
            <Link
              href="/"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
} 