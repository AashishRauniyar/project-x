"use client";
import React from "react";
import BrandsHero from "@/components/brands/BrandsHero";
import FeaturedBrands from "@/components/brands/FeaturedBrands";
import BrandSlider from "@/components/brands/BrandSlider";
import AllBrands from "@/components/brands/AllBrands";
import BrandCategories from "@/components/brands/BrandCategories";
import BrandStats from "@/components/brands/BrandStats";
import BrandTestimonials from "@/components/brands/BrandTestimonials";
import BrandCTA from "@/components/brands/BrandCTA";

const BrandsPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Health & Wellness Brands",
    description:
      "Comprehensive collection of top health and wellness brands with expert reviews and ratings",
    url: "https://wowmd.com/brands",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: 500,
      itemListElement: [
        {
          "@type": "Brand",
          name: "Premium Health Brands",
          description: "Top-rated health and wellness brands",
        },
      ],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://wowmd.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Brands",
          item: "https://wowmd.com/brands",
        },
      ],
    },
  };

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      <head>
        <title>
          Top Health & Wellness Brands | Trusted Product Reviews | WOWMD
        </title>
        <meta
          name="description"
          content="Discover top-rated health and wellness brands. Expert reviews, product comparisons, and trusted recommendations from leading healthcare professionals."
        />
        <link rel="canonical" href="/brands" />
      </head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <BrandsHero />

      {/* Brand Slider - Auto-sliding logos */}
      <BrandSlider />

      {/* Featured Brands */}
      <FeaturedBrands />

      {/* Brand Categories */}
      <BrandCategories />

      {/* Brand Statistics */}
      <BrandStats />

      {/* All Brands A-Z */}
      <AllBrands />

      {/* Brand Testimonials */}
      <BrandTestimonials />

      {/* Call to Action */}
      <BrandCTA />
    </div>
  );
};

export default BrandsPage;
