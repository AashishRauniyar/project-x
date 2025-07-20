import React from "react";
import { Metadata } from "next";
import {
  generateMetadata as genMeta,
  generateWebPageStructuredData,
  generateHealthKeywords,
  injectStructuredData,
} from "@/app/lib/seo-utils";
import BrandsHero from "@/components/brands/BrandsHero";
import FeaturedBrands from "@/components/brands/FeaturedBrands";
import BrandSlider from "@/components/brands/BrandSlider";
import AllBrands from "@/components/brands/AllBrands";
import BrandCategories from "@/components/brands/BrandCategories";
import BrandStats from "@/components/brands/BrandStats";
import BrandTestimonials from "@/components/brands/BrandTestimonials";
import BrandCTA from "@/components/brands/BrandCTA";

export const metadata: Metadata = genMeta({
  title: "Top Health & Wellness Brands - Expert Reviews & Rankings",
  description:
    "Discover the top health and wellness brands with expert reviews, detailed analysis, and comprehensive rankings. From supplements to skincare, find trusted brands backed by science.",
  canonical: "/brands",
  type: "website",
  tags: generateHealthKeywords("brands", [
    "health brands",
    "wellness brands",
    "supplement companies",
    "skincare brands",
    "fitness brands",
    "nutrition companies",
    "brand reviews",
    "trusted brands",
    "top rated brands",
    "brand comparisons",
  ]).split(", "),
});

const BrandsPage = () => {
  const structuredData = generateWebPageStructuredData({
    name: "Top Health & Wellness Brands",
    description:
      "Expert reviews and rankings of top health and wellness brands",
    url: "https://healthscopedaily.com/brands",
    breadcrumbs: [
      { name: "Home", url: "https://healthscopedaily.com" },
      { name: "Brands", url: "https://healthscopedaily.com/brands" },
    ],
  });

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      {injectStructuredData(structuredData)}

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
