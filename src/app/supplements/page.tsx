import React from "react";
import { Metadata } from "next";
import {
  generateMetadata as genMeta,
  generateWebPageStructuredData,
  generateHealthKeywords,
  injectStructuredData,
} from "@/app/lib/seo-utils";
import SupplementsHero from "@/components/supplements/SupplementsHero";
import FeaturedSupplements from "@/components/supplements/FeaturedSupplements";
import SupplementCategories from "@/components/supplements/SupplementCategories";
import ProductGrid from "@/components/supplements/ProductGrid";
import ExpertRecommendations from "@/components/supplements/ExpertRecommendations";
import NutritionGuide from "@/components/supplements/NutritionGuide";
import SupplementsNewsletter from "@/components/supplements/SupplementsNewsletter";

export const metadata: Metadata = genMeta({
  title: "Premium Supplements & Vitamins - Expert Reviews & Guides",
  description:
    "Discover top-rated supplements and vitamins with expert reviews, detailed guides, and personalized recommendations for optimal health and wellness. FDA-approved, lab-tested, and scientifically backed.",
  canonical: "/supplements",
  type: "website",
  tags: generateHealthKeywords("supplements", [
    "supplement reviews",
    "vitamin guides",
    "protein powder",
    "omega-3",
    "multivitamins",
    "probiotics",
    "lab tested supplements",
    "FDA approved vitamins",
    "nutritionist recommended",
    "supplement safety",
  ]).split(", "),
});

const SupplementsPage = () => {
  const structuredData = generateWebPageStructuredData({
    name: "Premium Supplements & Vitamins",
    description:
      "Expert-reviewed supplements and vitamins with detailed guides and personalized recommendations",
    url: "https://healthscopedaily.com/supplements",
    breadcrumbs: [
      { name: "Home", url: "https://healthscopedaily.com" },
      { name: "Supplements", url: "https://healthscopedaily.com/supplements" },
    ],
  });

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <SupplementsHero />

      {/* Featured Supplements */}
      <FeaturedSupplements />

      {/* Supplement Categories */}
      <SupplementCategories />

      {/* Product Grid */}
      <ProductGrid />

      {/* Expert Recommendations */}
      <ExpertRecommendations />

      {/* Nutrition Guide */}
      <NutritionGuide />

      {/* Newsletter */}
      <SupplementsNewsletter />
    </div>
  );
};

export default SupplementsPage;
