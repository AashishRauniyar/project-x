import { getAllCategories } from "@/app/lib/wordpress";
import { Category } from "@/app/lib/wordpress.d";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/ui/Footer";

// Interface for hierarchical category structure
interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[]
}

// Function to organize categories into hierarchical structure
const organizeCategories = (categories: Category[]): CategoryWithChildren[] => {
  const categoryMap = new Map<number, CategoryWithChildren>()
  const rootCategories: CategoryWithChildren[] = []

  // First pass: create all categories with empty children arrays
  categories.forEach(cat => {
    categoryMap.set(cat.id, { ...cat, children: [] })
  })

  // Second pass: organize into hierarchy
  categories.forEach(cat => {
    const categoryWithChildren = categoryMap.get(cat.id)!
    
    if (cat.parent === 0) {
      // Root category
      rootCategories.push(categoryWithChildren)
    } else {
      // Child category - add to parent's children array
      const parent = categoryMap.get(cat.parent)
      if (parent) {
        parent.children.push(categoryWithChildren)
      }
    }
  })

  return rootCategories
}

export default async function CategoriesPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'All Categories', href: '/categories' },
  ];

  let categoriesHierarchy: CategoryWithChildren[] = []
  let totalCategories = 0
  let totalPosts = 0

  try {
    const wpCategories = await getAllCategories()
    console.log('📋 All categories fetched:', wpCategories)
    
    // Filter out uncategorized and organize into hierarchy
    const validCategories = wpCategories
      .filter(cat => cat.name !== 'Uncategorized' && cat.count > 0)
    
    categoriesHierarchy = organizeCategories(validCategories)
    totalCategories = validCategories.length
    totalPosts = validCategories.reduce((sum, cat) => sum + cat.count, 0)
    
  } catch (error) {
    console.error('❌ Failed to fetch categories:', error)
    
    // Fallback categories based on actual WordPress structure
    categoriesHierarchy = [
      { 
        id: 15, 
        name: 'General Health', 
        slug: 'general-health', 
        count: 45, 
        description: 'Comprehensive health guides covering various aspects of wellness and medical topics.',
        link: '', 
        taxonomy: 'category' as const, 
        parent: 0, 
        meta: {}, 
        children: [
          { id: 18, name: 'Blood Sugar', slug: 'blood-sugar', count: 8, description: 'Blood sugar management and diabetes prevention', link: '', taxonomy: 'category' as const, parent: 15, meta: {}, children: [] },
          { id: 19, name: 'Bodybuilding', slug: 'bodybuilding', count: 12, description: 'Muscle building and fitness supplements', link: '', taxonomy: 'category' as const, parent: 15, meta: {}, children: [] },
          { id: 27, name: 'Bone Products', slug: 'bone-products', count: 7, description: 'Bone health and calcium supplements', link: '', taxonomy: 'category' as const, parent: 15, meta: {}, children: [] }
        ]
      },
      { 
        id: 2, 
        name: 'Beauty & Skin Care', 
        slug: 'beauty-skin-care', 
        count: 25, 
        description: 'Skincare products, anti-aging solutions, and beauty treatments.',
        link: '', 
        taxonomy: 'category' as const, 
        parent: 0, 
        meta: {}, 
        children: [] 
      },
      { 
        id: 3, 
        name: 'Weight Loss', 
        slug: 'weight-loss', 
        count: 20, 
        description: 'Weight management supplements and healthy lifestyle tips.',
        link: '', 
        taxonomy: 'category' as const, 
        parent: 0, 
        meta: {}, 
        children: [] 
      }
    ]
    totalCategories = 6
    totalPosts = 90
  }

  // Component to render category cards
  const CategoryCard = ({ category, isSubcategory = false }: { category: CategoryWithChildren, isSubcategory?: boolean }) => (
    <div className={`group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 overflow-hidden ${isSubcategory ? '' : 'lg:col-span-1'}`}>
      <Link href={`/category/${category.slug}`} className="block">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className={`font-bold text-gray-900 group-hover:text-primary-600 transition-colors ${isSubcategory ? 'text-lg' : 'text-xl'} mb-2`}>
                {category.name}
              </h3>
              {category.description && (
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>
            <span className="bg-primary-50 text-primary-700 text-sm px-3 py-1.5 rounded-full font-semibold ml-4 flex-shrink-0">
              {category.count}
            </span>
          </div>
          
          {!isSubcategory && category.children.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center text-primary-600 text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {category.children.length} subcategories
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Page Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mt-6 mb-8 border border-gray-100">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Categories</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our comprehensive collection of health and wellness topics. Find expert reviews, trusted advice, and evidence-based information across all health categories.
            </p>
            <div className="flex items-center justify-center space-x-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">{totalCategories}</div>
                <div className="text-sm text-gray-500 font-medium">Categories</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">{totalPosts}</div>
                <div className="text-sm text-gray-500 font-medium">Articles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {categoriesHierarchy.map((category) => (
            <div key={category.id} className="space-y-6">
              {/* Parent Category */}
              <CategoryCard category={category} />
              
              {/* Subcategories */}
              {category.children.length > 0 && (
                <div className="ml-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="w-1 h-6 bg-primary-500 rounded-full mr-3"></span>
                    {category.name} Subcategories
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.children.map((child) => (
                      <CategoryCard key={child.id} category={child} isSubcategory={true} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Our health experts are constantly adding new content. Subscribe to our newsletter to stay updated with the latest health insights and product reviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/newsletter"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Subscribe to Newsletter
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Contact Our Experts
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 