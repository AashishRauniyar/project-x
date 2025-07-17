import React from 'react';
import { extractStructuredData, generateOrganizationData, generateArticleStructuredData, generateBreadcrumbData } from '@/app/lib/seo';
import type { Post, Category } from '@/app/lib/wordpress.d';

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

interface Product {
  name: string;
  description: string;
  brand: string;
  price: string;
  image: string;
  aggregateRating: {
    ratingValue: number;
    reviewCount: number;
  };
  reviews: Review[];
}

interface Article {
  headline: string;
  description: string;
  author: {
    name: string;
    type: string;
  };
  datePublished: string;
  dateModified: string;
  publisher: {
    name: string;
    logo: string;
  };
  image: string;
  url: string;
}

interface StructuredDataProps {
  article?: Article;
  product?: Product;
  post?: Post;
  category?: Category;
  breadcrumbs?: Array<{ label: string; href: string }>;
  organization?: {
    name: string;
    url: string;
    logo: string;
    description: string;
    sameAs: string[];
  };
  includeYoastData?: boolean;
  includeOrganization?: boolean;
}

const StructuredData: React.FC<StructuredDataProps> = ({ 
  article, 
  product, 
  post, 
  category, 
  breadcrumbs, 
  organization, 
  includeYoastData = true, 
  includeOrganization = true 
}) => {
  const generateStructuredData = () => {
    const structuredData: Record<string, unknown>[] = [];

    // Add default organization data if requested
    if (includeOrganization && !organization) {
      structuredData.push(generateOrganizationData());
    }

    // Organization schema (custom)
    if (organization) {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": organization.name,
        "url": organization.url,
        "logo": {
          "@type": "ImageObject",
          "url": organization.logo
        },
        "description": organization.description,
        "sameAs": organization.sameAs
      });
    }

    // Post-based article schema (using WordPress data)
    if (post) {
      structuredData.push(generateArticleStructuredData(post));
      
      // Extract and include Yoast structured data if available
      if (includeYoastData && post.yoast_head) {
        const yoastData = extractStructuredData(post.yoast_head);
        if (yoastData && yoastData['@graph']) {
          // Yoast typically provides a graph with multiple items
          const graph = yoastData['@graph'] as Record<string, unknown>[];
          structuredData.push(...graph);
        } else if (yoastData) {
          structuredData.push(yoastData);
        }
      }
    }

    // Breadcrumbs schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      structuredData.push(generateBreadcrumbData(breadcrumbs));
    }

    // Article schema
    if (article) {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.headline,
        "description": article.description,
        "image": {
          "@type": "ImageObject",
          "url": article.image
        },
        "author": {
          "@type": article.author.type,
          "name": article.author.name
        },
        "publisher": {
          "@type": "Organization",
          "name": article.publisher.name,
          "logo": {
            "@type": "ImageObject",
            "url": article.publisher.logo
          }
        },
        "datePublished": article.datePublished,
        "dateModified": article.dateModified,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": article.url
        }
      });
    }

    // Product schema
    if (product) {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "brand": {
          "@type": "Brand",
          "name": product.brand
        },
        "image": {
          "@type": "ImageObject",
          "url": product.image
        },
        "offers": {
          "@type": "Offer",
          "price": product.price.replace('$', ''),
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.aggregateRating.ratingValue,
          "reviewCount": product.aggregateRating.reviewCount,
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": product.reviews.map(review => ({
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": review.author
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating,
            "bestRating": "5",
            "worstRating": "1"
          },
          "reviewBody": review.reviewBody,
          "datePublished": review.datePublished
        }))
      });
    }

    return structuredData;
  };

  const structuredDataArray = generateStructuredData();

  return (
    <>
      {structuredDataArray.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data, null, 2)
          }}
        />
      ))}
    </>
  );
};

export default StructuredData; 