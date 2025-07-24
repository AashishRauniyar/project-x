import { getPostsByCategorySlug, getCategoryBySlug } from "@/app/lib/wordpress";
import Link from "next/link";
// Try to import Breadcrumb if available
// import Breadcrumb from "@/components/ui/Breadcrumb";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = await getCategoryBySlug(slug);
  const posts = await getPostsByCategorySlug(slug);

  // Helper to get excerpt
  function getExcerpt(content: string, wordLimit: number = 30): string {
    const plainText = content.replace(/<[^>]*>/g, "");
    const words = plainText.split(" ");
    if (words.length <= wordLimit) return plainText;
    return words.slice(0, wordLimit).join(" ") + "...";
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/" className="hover:underline text-primary-600">Home</Link>
            <span className="mx-2">&gt;</span>
          </li>
          <li className="flex items-center">
            <span className="text-gray-700 font-medium">{category ? category.name : slug}</span>
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold mb-6 text-center">
        {category ? category.name : slug}
      </h1>
      {category && category.description && (
        <p className="text-gray-600 mb-6 text-center">{category.description}</p>
      )}
      <h2 className="text-xl font-semibold mb-8 text-center">Posts in this category:</h2>
      {posts.length === 0 ? (
        <p className="text-center">No posts found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const featuredImage = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]?.source_url;
            return (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Article Image or Placeholder */}
                {featuredImage ? (
                  <img
                    src={featuredImage}
                    alt={post.title.rendered}
                    className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
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
                )}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    <Link href={`/post/${post.slug}`}>{post.title.rendered}</Link>
                  </h2>
                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt?.rendered
                      ? post.excerpt.rendered.replace(/<[^>]*>/g, "")
                      : getExcerpt(post.content.rendered)}
                  </p>
                  {/* Read More Button */}
                  <Link
                    href={`/post/${post.slug}`}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group/link"
                  >
                    Read Full Article
                    <svg
                      className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
