import React from 'react';

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
  organization?: {
    name: string;
    url: string;
    logo: string;
    description: string;
    sameAs: string[];
  };
}

const StructuredData: React.FC<StructuredDataProps> = ({ article, product, organization }) => {
  const generateStructuredData = () => {
    const structuredData: any[] = [];

    // Organization schema
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