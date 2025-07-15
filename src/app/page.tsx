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

  return (
    <div>
      <section className="bg-gray-700 text-white text-center p-12 mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to My Blog</h1>
        <p className="text-xl">
          A place to share knowledge and ideas with the world.
        </p>
      </section>

      {categoriesWithPosts.map(({ id, name, posts }) => {
        if (posts.length === 0) return null;
        return (
          <section key={id} className="mb-8">
            <h2 className="text-3xl font-bold border-b-2 border-gray-500 pb-2 mb-4">
              {name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: Post) => (
                <div key={post.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt={post.title.rendered}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">
                      <Link href={`/post/${post.slug}`}>
                        {post.title.rendered}
                      </Link>
                    </h3>
                    <div
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
