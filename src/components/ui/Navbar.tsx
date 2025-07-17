'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, ChevronRightIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { getAllCategories } from '@/app/lib/wordpress'
import type { Category } from '@/app/lib/wordpress.d'

// Interface for hierarchical category structure
interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[]
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [categoriesHierarchy, setCategoriesHierarchy] = useState<CategoryWithChildren[]>([])
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('🔍 Fetching WordPress categories...')
        const wpCategories = await getAllCategories()
        console.log('📋 Fetched categories:', wpCategories)
        
        // Filter out uncategorized and organize into hierarchy
        const validCategories = wpCategories
          .filter(cat => cat.name !== 'Uncategorized')
        
        console.log('✅ Valid categories:', validCategories)
        
        const hierarchicalCategories = organizeCategories(validCategories)
        console.log('🌳 Hierarchical categories:', hierarchicalCategories)
        
        setCategoriesHierarchy(hierarchicalCategories)
      } catch (error) {
        console.error('❌ Failed to fetch categories:', error)
        console.log('🔄 Using fallback categories...')
        
        // Enhanced fallback categories based on your WordPress structure
        const fallbackCategories = [
          { id: 15, name: 'General Health', slug: 'general-health', count: 35, description: '', link: '', taxonomy: 'category' as const, parent: 0, meta: {}, children: [
            { id: 17, name: 'Blood Sugar', slug: 'blood-sugar', count: 8, description: '', link: '', taxonomy: 'category' as const, parent: 15, meta: {}, children: [] },
            { id: 19, name: 'Bodybuilding', slug: 'bodybuilding', count: 5, description: '', link: '', taxonomy: 'category' as const, parent: 15, meta: {}, children: [] },
            { id: 27, name: 'Bone Products', slug: 'bone-products', count: 6, description: '', link: '', taxonomy: 'category' as const, parent: 15, meta: {}, children: [] }
          ]},
          { id: 2, name: 'Beauty & Skin Care', slug: 'beauty-skin-care', count: 25, description: '', link: '', taxonomy: 'category' as const, parent: 0, meta: {}, children: [
            { id: 11, name: 'Anti Aging', slug: 'anti-aging', count: 8, description: '', link: '', taxonomy: 'category' as const, parent: 2, meta: {}, children: [] },
            { id: 12, name: 'Eye Cream', slug: 'eye-cream', count: 5, description: '', link: '', taxonomy: 'category' as const, parent: 2, meta: {}, children: [] },
            { id: 13, name: 'Facial Cleanser', slug: 'facial-cleanser', count: 6, description: '', link: '', taxonomy: 'category' as const, parent: 2, meta: {}, children: [] }
          ]},
          { id: 3, name: 'Weight Management', slug: 'weight-management', count: 18, description: '', link: '', taxonomy: 'category' as const, parent: 0, meta: {}, children: [] },
          { id: 4, name: 'Mental Health', slug: 'mental-health', count: 12, description: '', link: '', taxonomy: 'category' as const, parent: 0, meta: {}, children: [] },
        ]
        setCategoriesHierarchy(fallbackCategories)
      }
    }

    fetchCategories()
  }, [])

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const closeDropdown = () => {
    setOpenDropdown(null)
    setHoveredCategory(null)
  }

  // Component to render category with subcategories
  const CategoryItem = ({ category, isSubcategory = false }: { category: CategoryWithChildren, isSubcategory?: boolean }) => (
    <div key={category.id} className="relative">
      <div
        className={`group ${isSubcategory ? 'pl-4' : ''}`}
        onMouseEnter={() => setHoveredCategory(category.id)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <Link
          href={`/category/${category.slug}`}
          className={`flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg mx-2 ${
            isSubcategory ? 'text-sm py-2' : 'font-medium'
          }`}
          onClick={closeDropdown}
        >
          <div className="flex items-center space-x-2">
            <span>{category.name}</span>
            {category.count > 0 && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                {category.count}
              </span>
            )}
          </div>
          {category.children.length > 0 && !isSubcategory && (
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          )}
        </Link>
        
        {/* Subcategories dropdown */}
        {category.children.length > 0 && !isSubcategory && hoveredCategory === category.id && (
          <div className="absolute left-full top-0 ml-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50">
            <div className="px-4 py-2 border-b border-gray-100 mb-2">
              <span className="text-sm font-semibold text-primary-700">{category.name} Subcategories</span>
            </div>
            {category.children.map((child) => (
              <CategoryItem key={child.id} category={child} isSubcategory={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>🏆 Trusted Health Source Since 2024</span>
            <span>📞 Customer Support: 1-800-XXX-XXXX</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/newsletter" className="hover:text-primary-100 transition-colors">
              Newsletter
            </Link>
            <Link href="/about" className="hover:text-primary-100 transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HLT</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Healthy Lifestyle Tips</h1>
                <p className="text-sm text-gray-600">Expert supplement reviews and wellness tips</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home */}
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Home
            </Link>

            {/* Categories Dropdown - WordPress Categories */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('categories')}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors py-2 px-3 rounded-lg hover:bg-primary-50 font-medium"
              >
                <span>Categories</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {openDropdown === 'categories' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <span className="text-sm font-semibold text-gray-900">Browse by Category</span>
                  </div>
                  {categoriesHierarchy.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                  ))}
                  <div className="border-t border-gray-100 mt-3 pt-3">
                    <Link
                      href="/categories"
                      className="block mx-2 px-4 py-2 text-primary-600 font-medium hover:bg-primary-50 transition-colors rounded-lg text-center"
                      onClick={closeDropdown}
                    >
                      View All Categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Blog/Articles */}
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Blog
            </Link>

            {/* Reviews */}
            <Link 
              href="/reviews" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Reviews
            </Link>

            {/* About */}
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              About
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
            <Link
              href="/newsletter"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-1">
              {/* Home */}
              <Link
                href="/"
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium rounded-lg mx-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Categories with Hierarchical Structure */}
              <div className="px-2">
                <div className="font-semibold text-gray-900 px-2 py-2 border-b border-gray-100 mb-2">
                  Categories
                </div>
                <div className="space-y-1">
                  {categoriesHierarchy.map((category) => (
                    <div key={category.id}>
                      <Link
                        href={`/category/${category.slug}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{category.name}</span>
                          {category.count > 0 && (
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                              {category.count}
                            </span>
                          )}
                        </div>
                      </Link>
                      {/* Mobile Subcategories */}
                      {category.children.length > 0 && (
                        <div className="pl-4 space-y-1 mt-1">
                          {category.children.map((child) => (
                            <Link
                              key={child.id}
                              href={`/category/${child.slug}`}
                              className="block px-4 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-center justify-between">
                                <span>• {child.name}</span>
                                {child.count > 0 && (
                                  <span className="text-xs text-gray-400">({child.count})</span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Link
                  href="/categories"
                  className="block px-4 py-3 mt-3 text-primary-600 font-medium border-t border-gray-100 pt-3"
                  onClick={() => setIsOpen(false)}
                >
                  View All Categories →
                </Link>
              </div>

              {/* Blog */}
              <Link
                href="/blog"
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium rounded-lg mx-2"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>

              {/* Reviews */}
              <Link
                href="/reviews"
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium rounded-lg mx-2"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>

              {/* About */}
              <Link
                href="/about"
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium rounded-lg mx-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <div className="pt-4 border-t border-gray-200 mt-4 mx-2">
                <Link
                  href="/newsletter"
                  className="block w-full bg-primary-600 text-white text-center px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdowns */}
      {openDropdown && (
        <div 
          className="fixed inset-0 z-40"
          onClick={closeDropdown}
        />
      )}
    </nav>
  )
} 