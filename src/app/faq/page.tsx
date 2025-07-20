import React from "react";
import { Metadata } from "next";
import {
  generateMetadata as genMeta,
  generateWebPageStructuredData,
  generateHealthKeywords,
  injectStructuredData,
  generateFAQStructuredData,
} from "@/app/lib/seo-utils";
import FAQHero from "@/components/faq/FAQHero";
import FAQSearch from "@/components/faq/FAQSearch";
import FAQCategories from "@/components/faq/FAQCategories";

export const metadata: Metadata = genMeta({
  title:
    "Frequently Asked Questions - Health & Wellness Support | HealthScopeDaily",
  description:
    "Find answers to common questions about health supplements, product reviews, and wellness guidance. Get expert support for your health journey with HealthScopeDaily.",
  canonical: "/faq",
  type: "website",
  tags: generateHealthKeywords("faq", [
    "frequently asked questions",
    "health FAQ",
    "supplement questions",
    "product support",
    "wellness help",
    "health guidance",
    "expert answers",
    "medical questions",
    "customer support",
    "help center",
  ]).split(", "),
});

const FAQPage = () => {
  // FAQ data for structured data
  const faqData = [
    {
      question: "What is HealthScopeDaily?",
      answer:
        "HealthScopeDaily is a leading source for expert health and wellness reviews, providing evidence-based information about supplements, health products, and wellness solutions.",
    },
    {
      question: "How do I search HealthScopeDaily?",
      answer:
        "You can search our site using the search bar at the top of any page, browse by categories, or use our comprehensive FAQ section to find specific information.",
    },
    {
      question: "Are your reviews unbiased?",
      answer:
        "Yes, we maintain strict editorial independence and provide unbiased reviews based on scientific research, expert analysis, and comprehensive testing.",
    },
    {
      question: "How can I contact HealthScopeDaily?",
      answer:
        "You can contact us through our contact form, email us directly, or use our social media channels. We typically respond within 24-48 hours.",
    },
  ];

  const structuredData = generateWebPageStructuredData({
    name: "Frequently Asked Questions - HealthScopeDaily",
    description:
      "Comprehensive FAQ covering health supplements, product reviews, and wellness guidance",
    url: "https://healthscopedaily.com/faq",
    breadcrumbs: [
      { name: "Home", url: "https://healthscopedaily.com" },
      { name: "FAQ", url: "https://healthscopedaily.com/faq" },
    ],
  });

  const faqStructuredData = generateFAQStructuredData(faqData);

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      {injectStructuredData(structuredData)}
      {injectStructuredData(faqStructuredData)}

      {/* Hero Section */}
      <FAQHero />

      {/* Search Section */}
      <FAQSearch />

      {/* Categories Section */}
      <FAQCategories />
    </div>
  );
};

export default FAQPage;
