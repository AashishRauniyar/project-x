import { Metadata } from "next";
import { siteConfig } from "./seo";
import React, { ReactElement } from "react";

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article" | "product" | "organization";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  canonical,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  tags,
  noIndex = false,
}: SEOProps): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaUrl = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: tags?.join(", "),
    authors: author ? [{ name: author }] : [{ name: siteConfig.author }],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      siteName: siteConfig.name,
      type: type === "product" || type === "organization" ? "website" : type,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: siteConfig.twitter,
    },
    alternates: {
      canonical: metaUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateArticleStructuredData({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author,
  tags,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    image: image || siteConfig.ogImage,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: author || siteConfig.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/HealthScopeDaily.png`,
      },
    },
    keywords: tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function generateProductStructuredData({
  name,
  description,
  url,
  image,
  brand,
  price,
  currency = "USD",
  availability = "InStock",
  rating,
  reviewCount,
  sku,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  brand?: string;
  price?: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  rating?: number;
  reviewCount?: number;
  sku?: string;
}) {
  const product: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    url: url,
    image: image || siteConfig.ogImage,
    brand: {
      "@type": "Brand",
      name: brand || "HealthScopeDaily",
    },
    sku: sku,
  };

  if (price) {
    product.offers = {
      "@type": "Offer",
      price: price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
    };
  }

  if (rating && reviewCount) {
    product.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return product;
}

export function generateBreadcrumbStructuredData(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQStructuredData(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateReviewStructuredData({
  itemName,
  itemType = "Product",
  rating,
  reviewBody,
  author,
  datePublished,
}: {
  itemName: string;
  itemType?: string;
  rating: number;
  reviewBody: string;
  author: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": itemType,
      name: itemName,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: reviewBody,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: datePublished,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function generateWebPageStructuredData({
  name,
  description,
  url,
  breadcrumbs,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: { name: string; url: string }[];
}) {
  const webpage: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name,
    description: description,
    url: url,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/HealthScopeDaily.png`,
      },
    },
  };

  if (breadcrumbs) {
    webpage.breadcrumb = generateBreadcrumbStructuredData(breadcrumbs);
  }

  return webpage;
}

export function generateHealthArticleStructuredData({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author,
  medicallyReviewed = true,
  lastReviewed,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  medicallyReviewed?: boolean;
  lastReviewed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: title,
    description: description,
    url: url,
    image: image || siteConfig.ogImage,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    lastReviewed: lastReviewed || modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: author || siteConfig.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/HealthScopeDaily.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
         reviewedBy: medicallyReviewed
       ? {
           "@type": "Organization",
           name: "HealthScopeDaily Medical Review Team",
         }
       : undefined,
  };
}

// Helper function to inject structured data into a page
export function injectStructuredData(data: any): ReactElement {
  return React.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}

// Generate common page keywords based on category
export function generateHealthKeywords(
  category?: string,
  additional?: string[]
) {
  const baseKeywords = [
    "health",
    "wellness",
    "expert reviews",
    "evidence-based",
    "medical advice",
    "health tips",
         "HealthScopeDaily",
  ];

  const categoryKeywords: Record<string, string[]> = {
    supplements: [
      "supplements",
      "vitamins",
      "minerals",
      "nutrition",
      "dietary supplements",
    ],
    beauty: [
      "skincare",
      "beauty products",
      "anti-aging",
      "cosmetics",
      "dermatology",
    ],
    fitness: [
      "exercise",
      "workout",
      "physical fitness",
      "training",
      "sports nutrition",
    ],
    "mental-health": [
      "mental health",
      "psychology",
      "stress management",
      "anxiety",
      "depression",
    ],
    "weight-management": [
      "weight loss",
      "diet",
      "obesity",
      "metabolism",
      "nutrition",
    ],
  };

  const keywords = [
    ...baseKeywords,
    ...(category && categoryKeywords[category]
      ? categoryKeywords[category]
      : []),
    ...(additional || []),
  ];

  return keywords.join(", ");
}
