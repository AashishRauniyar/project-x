import { getPostBySlug, getAllCategories } from "../../lib/wordpress";
import { Post, Category, Tag } from "../../lib/wordpress.d";
import { generatePostMetadata, extractStructuredData, generateArticleStructuredData, generateBreadcrumbData } from "../../lib/seo";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/ui/Footer";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata using Yoast SEO data
export async function generateMetadata({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    
    if (!post) {
      return {
        title: 'Post Not Found - Healthy Lifestyle Tips',
        description: 'The article you are looking for could not be found.',
      };
    }
    
    return generatePostMetadata(post);
  } catch (error) {
    console.error('Error generating post metadata:', error);
    return {
      title: 'Article - Healthy Lifestyle Tips',
      description: 'Expert health and wellness content to improve your lifestyle.',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
              <p className="text-gray-600 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
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

    // Get post categories for breadcrumb
    const primaryCategory = post._embedded?.["wp:term"]?.[0]?.[0];
    
    const breadcrumbItems = [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      ...(primaryCategory ? [{ label: primaryCategory.name, href: `/category/${primaryCategory.slug}` }] : []),
      { label: post.title.rendered, href: `/post/${post.slug}` },
    ];

    // Generate structured data
    const articleStructuredData = generateArticleStructuredData(post);
    const breadcrumbStructuredData = generateBreadcrumbData(breadcrumbItems);
    const yoastStructuredData = extractStructuredData(post.yoast_head || '');

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
        />
        {yoastStructuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(yoastStructuredData),
            }}
          />
        )}
        
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
            {/* Main Content */}
            <article className="lg:col-span-3">
              {/* Article Header */}
              <header className="bg-white rounded-lg p-8 shadow-sm mb-8">
                <div className="mb-6">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                                         {post._embedded?.["wp:term"]?.[0]?.slice(0, 3).map((term: Category | Tag) => (
                      <Link
                        key={term.id}
                        href={`/category/${term.slug}`}
                        className="inline-block bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full hover:bg-primary-200 transition-colors font-medium"
                      >
                        {term.name}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Title */}
                  <h1 
                    className="text-4xl font-bold text-gray-900 mb-6 leading-tight"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                  />
                  
                  {/* Post Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-gray-600 border-t border-gray-200 pt-6">
                    {/* Author */}
                    {post._embedded?.author?.[0] && (
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 overflow-hidden">
                          {post._embedded.author[0].avatar_urls?.['96'] ? (
                            <img
                              src={post._embedded.author[0].avatar_urls['96']}
                              alt={post._embedded.author[0].name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary-200 flex items-center justify-center">
                              <span className="text-primary-700 font-medium text-lg">
                                {post._embedded.author[0].name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{post._embedded.author[0].name}</div>
                          <div className="text-sm text-gray-500">Author</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Publication Date */}
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900">Published</div>
                        <div className="text-sm">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Last Modified */}
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900">Updated</div>
                        <div className="text-sm">
                          {new Date(post.modified).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Featured Image */}
                {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <div className="mb-8">
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt={post.title.rendered}
                      className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                    {post._embedded["wp:featuredmedia"][0].caption?.rendered && (
                      <div 
                        className="text-sm text-gray-600 mt-2 text-center italic"
                        dangerouslySetInnerHTML={{ __html: post._embedded["wp:featuredmedia"][0].caption.rendered }}
                      />
                    )}
                  </div>
                )}
              </header>

              {/* Article Content */}
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:text-primary-700 prose-strong:text-gray-900 prose-blockquote:border-l-primary-500 prose-blockquote:bg-primary-50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
                />
                
                {/* Tags */}
                {post._embedded?.["wp:term"]?.[1] && post._embedded["wp:term"][1].length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tags</h3>
                    <div className="flex flex-wrap gap-2">
                                             {post._embedded["wp:term"][1].slice(0, 10).map((tag: Category | Tag) => (
                        <Link
                          key={tag.id}
                          href={`/tag/${tag.slug}`}
                          className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Article Navigation */}
              <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <Link
                    href="/blog"
                    className="flex items-center text-primary-600 hover:text-primary-700 transition-colors group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to All Articles
                  </Link>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Bookmark
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Related Categories */}
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Topics</h3>
                <div className="space-y-3">
                                     {post._embedded?.["wp:term"]?.[0]?.slice(0, 5).map((category: Category | Tag) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-50 hover:text-primary-700 transition-colors"
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-gray-600">{category.count} articles</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg p-6 text-white mb-8">
                <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                <p className="text-primary-100 text-sm mb-4">
                  Get the latest health and wellness insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  />
                  <button className="w-full bg-white text-primary-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Assurance</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Fact Checked</div>
                      <div className="text-sm text-gray-600">Verified by medical experts</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Research Based</div>
                      <div className="text-sm text-gray-600">Backed by scientific studies</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Trusted Source</div>
                      <div className="text-sm text-gray-600">Since 2013</div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Loading Article</h1>
            <p className="text-gray-600 mb-8">
              We encountered an error while loading this article. Please check your WordPress connection.
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