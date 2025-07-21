import { getPostBySlug, getAllCategories } from "../../lib/wordpress";
import { Post, Category, Tag } from "../../lib/wordpress.d";
import {
  generatePostMetadata,
  extractStructuredData,
  generateArticleStructuredData,
  generateBreadcrumbData,
} from "../../lib/seo";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";

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
        title: "Post Not Found - HealthScopeDaily",
        description: "The article you are looking for could not be found.",
      };
    }

    return generatePostMetadata(post);
  } catch (error) {
    console.error("Error generating post metadata:", error);
    return {
      title: "Article - HealthScopeDaily",
      description:
        "Expert health and wellness content to improve your lifestyle.",
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Navbar />
          <main className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.98-.833-2.75 0L3.064 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                Post Not Found
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                The article you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Return Home
              </Link>
            </div>
          </main>
        </div>
      );
    }

    // Get post categories for breadcrumb
    const primaryCategory = post._embedded?.["wp:term"]?.[0]?.[0];

    const breadcrumbItems = [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      ...(primaryCategory
        ? [
            {
              label: primaryCategory.name,
              href: `/category/${primaryCategory.slug}`,
            },
          ]
        : []),
      { label: post.title.rendered, href: `/post/${post.slug}` },
    ];

    // Generate structured data
    const articleStructuredData = generateArticleStructuredData(post);
    const breadcrumbStructuredData = generateBreadcrumbData(breadcrumbItems);
    const yoastStructuredData = extractStructuredData(post.yoast_head || "");

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-200 to-yellow-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-green-200 to-blue-200 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

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

        <main className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Main Content - Full Width */}
          <article className="space-y-8">
            {/* Article Header */}
            <header className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Header Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-green-400 to-blue-400 rounded-full blur-2xl"></div>
              </div>

              <div className="relative z-10">
                {/* Categories */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {post._embedded?.["wp:term"]?.[0]
                    ?.slice(0, 3)
                    .map((term: Category | Tag) => (
                      <Link
                        key={term.id}
                        href={`/category/${term.slug}`}
                        className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm px-4 py-2 rounded-full hover:from-blue-200 hover:to-purple-200 transition-all duration-300 font-semibold border border-blue-200/50 hover:border-blue-300 hover:scale-105 hover:shadow-lg"
                      >
                        <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {term.name}
                      </Link>
                    ))}
                </div>

                {/* Title */}
                <h1
                  className="text-5xl lg:text-6xl font-black text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text mb-8 leading-tight"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                {/* Post Meta */}
                <div className="flex flex-wrap items-center gap-8 text-gray-600 border-t border-gray-200/50 pt-8">
                  {/* Author */}
                  {post._embedded?.author?.[0] && (
                    <div className="flex items-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 rounded-full mr-4 overflow-hidden shadow-lg ring-4 ring-white group-hover:ring-blue-200 transition-all duration-300">
                        {post._embedded.author[0].avatar_urls?.["96"] ? (
                          <img
                            src={post._embedded.author[0].avatar_urls["96"]}
                            alt={post._embedded.author[0].name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              {post._embedded.author[0].name
                                .charAt(0)
                                .toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                          {post._embedded.author[0].name}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">Medical Expert</div>
                      </div>
                    </div>
                  )}

                  {/* Publication Date */}
                  <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-xl border border-green-200/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Published</div>
                      <div className="text-sm text-green-700 font-semibold">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Last Modified */}
                  <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-xl border border-blue-200/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Updated</div>
                      <div className="text-sm text-blue-700 font-semibold">
                        {new Date(post.modified).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <div className="mt-10 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <img
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post.title.rendered}
                    className="relative w-full h-auto object-cover rounded-2xl shadow-2xl border-4 border-white group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  {post._embedded["wp:featuredmedia"][0].caption?.rendered && (
                    <div
                      className="text-sm text-gray-600 mt-4 text-center italic bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200/50"
                      dangerouslySetInnerHTML={{
                        __html:
                          post._embedded["wp:featuredmedia"][0].caption.rendered,
                      }}
                    />
                  )}
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-10">
                <div className={`wordpress-content 
                  [&_h1]:text-6xl [&_h1]:font-black [&_h1]:bg-gradient-to-r [&_h1]:from-gray-900 [&_h1]:via-blue-800 [&_h1]:to-purple-800 [&_h1]:bg-clip-text [&_h1]:text-transparent [&_h1]:mb-12 [&_h1]:mt-16 [&_h1]:leading-tight [&_h1]:tracking-tight [&_h1]:pb-6
                  [&_h2]:text-4xl [&_h2]:font-black [&_h2]:bg-gradient-to-r [&_h2]:from-gray-900 [&_h2]:via-blue-800 [&_h2]:to-purple-800 [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2]:mb-8 [&_h2]:mt-16 [&_h2]:pl-8 [&_h2]:relative
                  [&_h3]:text-3xl [&_h3]:font-bold [&_h3]:text-blue-800 [&_h3]:mb-6 [&_h3]:mt-12 [&_h3]:flex [&_h3]:items-center [&_h3]:gap-3
                  [&_h4]:text-2xl [&_h4]:font-bold [&_h4]:text-purple-700 [&_h4]:mb-6 [&_h4]:mt-10 [&_h4]:uppercase [&_h4]:tracking-wider [&_h4]:border-l-4 [&_h4]:border-purple-400 [&_h4]:pl-6 [&_h4]:bg-gradient-to-r [&_h4]:from-purple-50 [&_h4]:to-transparent [&_h4]:py-4 [&_h4]:rounded-r-lg [&_h4]:shadow-sm
                  [&_h5]:text-xl [&_h5]:font-semibold [&_h5]:text-indigo-600 [&_h5]:mb-4 [&_h5]:mt-8 [&_h5]:italic [&_h5]:border-l-2 [&_h5]:border-indigo-300 [&_h5]:pl-4
                  [&_h6]:text-lg [&_h6]:font-medium [&_h6]:text-gray-600 [&_h6]:mb-3 [&_h6]:mt-6 [&_h6]:uppercase [&_h6]:tracking-widest [&_h6]:text-center
                  [&_p]:text-lg [&_p]:leading-loose [&_p]:text-gray-700 [&_p]:mb-8 [&_p]:tracking-wide [&_p]:font-normal
                  [&_a]:text-blue-600 [&_a]:no-underline [&_a]:font-semibold [&_a]:px-2 [&_a]:py-1 [&_a]:rounded-lg [&_a]:bg-blue-50 [&_a]:transition-all [&_a]:duration-300 [&_a]:border [&_a]:border-blue-200 hover:[&_a]:bg-blue-100 hover:[&_a]:text-blue-700 hover:[&_a]:shadow-lg hover:[&_a]:scale-105 hover:[&_a]:border-blue-300
                  [&_strong]:font-black [&_strong]:text-gray-900 [&_strong]:bg-gradient-to-r [&_strong]:from-yellow-100 [&_strong]:to-yellow-200 [&_strong]:px-2 [&_strong]:py-1 [&_strong]:rounded-lg [&_strong]:shadow-md [&_strong]:border [&_strong]:border-yellow-300
                  [&_em]:text-purple-700 [&_em]:font-semibold [&_em]:italic [&_em]:bg-gradient-to-r [&_em]:from-purple-50 [&_em]:to-purple-100 [&_em]:px-2 [&_em]:py-1 [&_em]:rounded-lg [&_em]:border [&_em]:border-purple-200 [&_em]:shadow-sm
                  [&_table]:w-full [&_table]:my-12 [&_table]:rounded-3xl [&_table]:overflow-hidden [&_table]:shadow-2xl [&_table]:border-0 [&_table]:bg-white [&_table]:backdrop-blur-xl [&_table]:ring-1 [&_table]:ring-gray-200/50
                  [&_thead]:bg-gradient-to-r [&_thead]:from-blue-600 [&_thead]:via-indigo-600 [&_thead]:to-purple-600 [&_thead]:shadow-lg
                  [&_th]:text-white [&_th]:font-black [&_th]:px-8 [&_th]:py-6 [&_th]:text-left [&_th]:border-0 [&_th]:text-sm [&_th]:uppercase [&_th]:tracking-widest [&_th]:bg-gradient-to-b [&_th]:from-transparent [&_th]:to-black/10
                  [&_tbody]:bg-white [&_tbody]:divide-y [&_tbody]:divide-gray-100/50
                  [&_tr]:border-0 [&_tr]:transition-all [&_tr]:duration-500 [&_tr]:group hover:[&_tr]:bg-gradient-to-r hover:[&_tr]:from-blue-50/50 hover:[&_tr]:via-indigo-50/30 hover:[&_tr]:to-purple-50/50 hover:[&_tr]:scale-[1.02] hover:[&_tr]:shadow-xl hover:[&_tr]:relative hover:[&_tr]:z-10
                  [&_td]:px-8 [&_td]:py-6 [&_td]:border-0 [&_td]:text-gray-700 [&_td]:font-medium [&_td]:align-middle [&_td]:text-base [&_td]:leading-relaxed [&_td]:transition-all [&_td]:duration-300
                  [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-4 [&_ul]:mb-10 [&_ul]:mt-6
                  [&_ol]:list-none [&_ol]:pl-0 [&_ol]:space-y-4 [&_ol]:mb-10 [&_ol]:mt-6
                  [&_li]:relative [&_li]:pl-10 [&_li]:py-4 [&_li]:mb-4 [&_li]:bg-gradient-to-r [&_li]:from-gray-50/80 [&_li]:to-blue-50/40 [&_li]:rounded-xl [&_li]:shadow-lg [&_li]:border-l-4 [&_li]:border-blue-400 [&_li]:transition-all [&_li]:duration-500 [&_li]:text-lg [&_li]:text-gray-700 [&_li]:leading-relaxed [&_li]:backdrop-blur-sm [&_li]:border [&_li]:border-white/60 hover:[&_li]:bg-gradient-to-r hover:[&_li]:from-blue-50/90 hover:[&_li]:to-indigo-50/60 hover:[&_li]:border-blue-500 hover:[&_li]:shadow-xl hover:[&_li]:scale-[1.02] hover:[&_li]:-translate-y-1
                  [&_blockquote]:border-l-8 [&_blockquote]:border-blue-500 [&_blockquote]:bg-gradient-to-r [&_blockquote]:from-blue-50/80 [&_blockquote]:via-indigo-50/60 [&_blockquote]:to-purple-50/80 [&_blockquote]:pl-10 [&_blockquote]:pr-8 [&_blockquote]:py-8 [&_blockquote]:rounded-r-3xl [&_blockquote]:shadow-2xl [&_blockquote]:font-medium [&_blockquote]:text-blue-900 [&_blockquote]:italic [&_blockquote]:text-xl [&_blockquote]:my-12 [&_blockquote]:relative [&_blockquote]:border [&_blockquote]:border-white/60 [&_blockquote]:backdrop-blur-sm
                  [&_img]:rounded-3xl [&_img]:shadow-2xl [&_img]:border-8 [&_img]:border-white [&_img]:my-12 [&_img]:mx-auto [&_img]:max-w-full [&_img]:h-auto [&_img]:transition-all [&_img]:duration-700 [&_img]:ring-1 [&_img]:ring-gray-200/50 hover:[&_img]:scale-105 [&_img]:cursor-pointer hover:[&_img]:ring-blue-300/50
                  [&_code]:text-pink-600 [&_code]:bg-gradient-to-r [&_code]:from-gray-100 [&_code]:to-gray-200 [&_code]:px-3 [&_code]:py-2 [&_code]:rounded-xl [&_code]:font-mono [&_code]:text-sm [&_code]:font-bold [&_code]:border [&_code]:border-gray-300 [&_code]:shadow-lg [&_code]:ring-1 [&_code]:ring-gray-200/50
                  [&_pre]:bg-gradient-to-br [&_pre]:from-gray-900 [&_pre]:via-slate-800 [&_pre]:to-gray-900 [&_pre]:text-green-400 [&_pre]:p-8 [&_pre]:rounded-3xl [&_pre]:shadow-2xl [&_pre]:border [&_pre]:border-gray-700 [&_pre]:overflow-x-auto [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-loose [&_pre]:my-12 [&_pre]:ring-1 [&_pre]:ring-gray-600/50 [&_pre]:backdrop-blur-sm
                  [&_hr]:border-0 [&_hr]:h-2 [&_hr]:bg-gradient-to-r [&_hr]:from-blue-500 [&_hr]:via-purple-500 [&_hr]:to-pink-500 [&_hr]:rounded-full [&_hr]:my-16 [&_hr]:shadow-xl
                  [&_figure]:my-12 [&_figure]:text-center [&_figure]:bg-gradient-to-br [&_figure]:from-white [&_figure]:to-gray-50 [&_figure]:rounded-3xl [&_figure]:p-8 [&_figure]:shadow-2xl [&_figure]:border [&_figure]:border-gray-100 [&_figure]:ring-1 [&_figure]:ring-gray-200/50
                  [&_figcaption]:text-gray-600 [&_figcaption]:text-sm [&_figcaption]:mt-6 [&_figcaption]:italic [&_figcaption]:font-medium [&_figcaption]:bg-gradient-to-r [&_figcaption]:from-gray-50 [&_figcaption]:to-blue-50 [&_figcaption]:px-6 [&_figcaption]:py-3 [&_figcaption]:rounded-xl [&_figcaption]:border [&_figcaption]:border-gray-200 [&_figcaption]:shadow-sm
                `}>
                  <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </div>

                {/* Tags */}
                {post._embedded?.["wp:term"]?.[1] &&
                  post._embedded["wp:term"][1].length > 0 && (
                    <div className="mt-16 pt-10 border-t border-gray-200/50">
                      <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        Related Tags
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {post._embedded["wp:term"][1]
                          .slice(0, 10)
                          .map((tag: Category | Tag) => (
                            <Link
                              key={tag.id}
                              href={`/tag/${tag.slug}`}
                              className="group inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 transition-all duration-300 font-medium border border-gray-200 hover:border-purple-300 hover:scale-105 hover:shadow-lg"
                            >
                              <span className="text-xs">#</span>
                              {tag.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Article Navigation */}
            <div className="bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <Link
                    href="/blog"
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-full font-bold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to All Articles
                  </Link>

                  <div className="flex items-center space-x-4">
                    <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full font-bold hover:from-blue-200 hover:to-purple-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-blue-200/50">
                      <svg
                        className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      Share Article
                    </button>
                    <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-6 py-3 rounded-full font-bold hover:from-green-200 hover:to-emerald-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-green-200/50">
                      <svg
                        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      Bookmark
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading post:", error);

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Error Loading Article
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              We encountered an error while loading this article. Please check your WordPress connection and try again.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return Home
            </Link>
          </div>
        </main>
      </div>
    );
  }
}
