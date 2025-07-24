"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getAllCategories } from "@/app/lib/wordpress";
import type { Category } from "@/app/lib/wordpress.d";

// Interface for hierarchical category structure
interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[];
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesHierarchy, setCategoriesHierarchy] = useState<
    CategoryWithChildren[]
  >([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  // Function to organize categories into hierarchical structure
  const organizeCategories = (
    categories: Category[]
  ): CategoryWithChildren[] => {
    const categoryMap = new Map<number, CategoryWithChildren>();
    const rootCategories: CategoryWithChildren[] = [];

    // First pass: create all categories with empty children arrays
    categories.forEach((cat) => {
      categoryMap.set(cat.id, { ...cat, children: [] });
    });

    // Second pass: organize into hierarchy
    categories.forEach((cat) => {
      const categoryWithChildren = categoryMap.get(cat.id)!;

      if (cat.parent === 0) {
        // Root category
        rootCategories.push(categoryWithChildren);
      } else {
        // Child category - add to parent's children array
        const parent = categoryMap.get(cat.parent);
        if (parent) {
          parent.children.push(categoryWithChildren);
        }
      }
    });

    return rootCategories;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("🔍 Fetching WordPress categories...");
        const wpCategories = await getAllCategories();
        console.log("📋 Fetched categories:", wpCategories);

        // Filter out uncategorized and organize into hierarchy
        const validCategories = wpCategories.filter(
          (cat) => cat.name !== "Uncategorized"
        );

        console.log("✅ Valid categories:", validCategories);

        const hierarchicalCategories = organizeCategories(validCategories);
        console.log("🌳 Hierarchical categories:", hierarchicalCategories);

        setCategoriesHierarchy(hierarchicalCategories);
      } catch (error) {
        console.error("❌ Failed to fetch categories:", error);
        // No fallback categories; only use live data from API
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
    setHoveredCategory(null);
  };

  // Component to render category with subcategories
  const CategoryItem = ({
    category,
    isSubcategory = false,
  }: {
    category: CategoryWithChildren;
    isSubcategory?: boolean;
  }) => (
    <div key={category.id} className="relative">
      <div
        className={`group ${isSubcategory ? "pl-4" : ""}`}
        onMouseEnter={() => setHoveredCategory(category.id)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <Link
          href={`/category/${category.slug}`}
          className={`flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg mx-2 ${
            isSubcategory ? "text-sm py-2" : "font-medium"
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
        {category.children.length > 0 &&
          !isSubcategory &&
          hoveredCategory === category.id && (
            <div className="absolute left-full top-0 ml-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50">
              <div className="px-4 py-2 border-b border-gray-100 mb-2">
                <span className="text-sm font-semibold text-primary-700">
                  {category.name} Subcategories
                </span>
              </div>
              {category.children.map((child) => (
                <CategoryItem
                  key={child.id}
                  category={child}
                  isSubcategory={true}
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50" role="banner">
      {/* Schema.org structured data for organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "HealthScopeDaily - Health & Wellness Expert Reviews",
            url: "https://healthscopedaily.com",
            logo: "https://healthscopedaily.com/HealthScopeDaily.png",
            description:
              "Expert health and wellness reviews, supplement guides, and professional medical advice.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-800-123-4567",
              contactType: "customer service",
            },
            sameAs: [
              "https://facebook.com/healthscopedaily",
              "https://twitter.com/healthscopedaily",
              "https://linkedin.com/company/healthscopedaily",
            ],
          }),
        }}
      />

      {/* Top Bar */}
      <div className="bg-primary-600 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>🏆 Trusted Health Source Since 2024</span>
            <span>📞 Customer Support: 1-800-XXX-XXXX</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/newsletter"
              className="hover:text-primary-100 transition-colors"
            >
              Newsletter
            </Link>
            <Link
              href="/about"
              className="hover:text-primary-100 transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className="max-w-7xl mx-auto px-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3"
              aria-label="HealthScopeDaily Home"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/HealthScopeDaily.png"
                  alt="HealthScopeDaily Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  HealthScopeDaily
                </h1>
                <p className="text-sm text-gray-600">
                  Health & Wellness Expert Reviews
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home */}
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
              aria-label="Home page"
            >
              Home
            </Link>

            {/* Categories Dropdown - WordPress Categories */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("categories")}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors py-2 px-3 rounded-lg hover:bg-primary-50 font-medium"
                aria-expanded={openDropdown === "categories"}
                aria-haspopup="true"
              >
                <span>Categories</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {openDropdown === "categories" && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <span className="text-sm font-semibold text-gray-900">
                      Browse by Category
                    </span>
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
              aria-label="Health blog and articles"
            >
              Blog
            </Link>

            {/* Supplements */}
            <Link
              href="/supplements"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
              aria-label="Supplement reviews and guides"
            >
              Supplements
            </Link>

            {/* Brands */}
            <Link
              href="/brands"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
              aria-label="Health brand reviews"
            >
              Brands
            </Link>

            {/* Reviews */}
            <Link
              href="/reviews"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
              aria-label="Product reviews"
            >
              Reviews
            </Link>

            {/* Company Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("company")}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors py-2 px-3 rounded-lg hover:bg-primary-50 font-medium"
                aria-expanded={openDropdown === "company"}
                aria-haspopup="true"
                aria-label="Company information and policies"
              >
                <span>Company</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {openDropdown === "company" && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50">
                  {/* Company Dropdown Image */}
                  <div className="px-4 pb-3 mb-3 border-b border-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=300&q=80"
                      alt="HealthScopeDaily Team"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="px-2">
                    <Link
                      href="/about"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg"
                      onClick={closeDropdown}
                    >
                      <span>About Us</span>
                    </Link>

                    <Link
                      href="/contact"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg"
                      onClick={closeDropdown}
                    >
                      <span>Contact Us</span>
                    </Link>

                    <Link
                      href="/faq"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg"
                      onClick={closeDropdown}
                    >
                      <span>Frequently Asked Questions</span>
                    </Link>

                    <Link
                      href="/review-guidelines"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg"
                      onClick={closeDropdown}
                    >
                      <span>Review Guidelines</span>
                    </Link>

                    <Link
                      href="/disclaimer"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg"
                      onClick={closeDropdown}
                    >
                      <span>Medical Disclaimer</span>
                    </Link>

                    <Link
                      href="/advertising"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg"
                      onClick={closeDropdown}
                    >
                      <span>Advertising Disclosure</span>
                    </Link>

                    <Link
                      href="/press"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg"
                      onClick={closeDropdown}
                    >
                      <span>Press Highlights</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
            <Link
              href="/newsletter"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg"
              >
                Blog
              </Link>
              <Link
                href="/supplements"
                className="px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg"
              >
                Supplements
              </Link>
              <Link
                href="/brands"
                className="px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg"
              >
                Brands
              </Link>
              <Link
                href="/reviews"
                className="px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg"
              >
                Reviews
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg"
              >
                Contact Us
              </Link>
              <Link
                href="/faq"
                className="px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg"
              >
                FAQ
              </Link>

              {/* Mobile Categories */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="px-4 py-2 text-sm font-semibold text-gray-900 mb-2">
                  Categories
                </div>
                {categoriesHierarchy.map((category) => (
                  <div key={category.id} className="ml-4">
                    <Link
                      href={`/category/${category.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        {category.count > 0 && (
                          <span className="text-xs text-gray-400">
                            ({category.count})
                          </span>
                        )}
                      </div>
                    </Link>
                    {category.children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/category/${child.slug}`}
                        className="block px-8 py-1 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <span>• {child.name}</span>
                          {child.count > 0 && (
                            <span className="text-xs text-gray-400">
                              ({child.count})
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Overlay for dropdowns */}
        {openDropdown && (
          <div className="fixed inset-0 z-40" onClick={closeDropdown} />
        )}
      </nav>
    </header>
  );
}
