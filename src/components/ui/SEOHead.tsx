import React from 'react';
import Head from 'next/head';
import { parseYoastHead, extractStructuredData, siteConfig } from '@/app/lib/seo';
import type { Post, Category } from '@/app/lib/wordpress.d';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  post?: Post;
  category?: Category;
  robots?: string;
  keywords?: string;
  customMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  post,
  category,
  robots,
  keywords,
  customMeta = []
}) => {
  // Extract Yoast data if available
  const yoastData = post?.yoast_head_json || category?.yoast_head_json;
  const yoastHead = post?.yoast_head || category?.yoast_head;
  const metaTags = parseYoastHead(yoastHead || '');

  // Use Yoast data first, then props, then defaults
  const finalTitle = yoastData?.title || metaTags.title || title || siteConfig.name;
  const finalDescription = yoastData?.description || metaTags.description || description || siteConfig.description;
  const finalCanonical = yoastData?.canonical || metaTags.canonical || canonical;
  const finalOgImage = yoastData?.og_image?.[0]?.url || metaTags.ogImage || ogImage || siteConfig.ogImage;
  const finalRobots = metaTags.robots || robots || 'index, follow';
  
  // Open Graph data
  const ogTitle = yoastData?.og_title || metaTags.ogTitle || finalTitle;
  const ogDescription = yoastData?.og_description || metaTags.ogDescription || finalDescription;
  const ogUrl = yoastData?.og_url || metaTags.ogUrl || finalCanonical;
  const ogSiteName = yoastData?.og_site_name || siteConfig.name;
  const ogLocale = yoastData?.og_locale || 'en_US';
  
  // Twitter Card data
  const twitterCard = yoastData?.twitter_card || metaTags.twitterCard || 'summary_large_image';
  const twitterTitle = yoastData?.twitter_title || metaTags.twitterTitle || finalTitle;
  const twitterDescription = yoastData?.twitter_description || metaTags.twitterDescription || finalDescription;
  const twitterImage = yoastData?.twitter_image || metaTags.twitterImage || finalOgImage;
  
  // Article-specific data
  const publishedTime = post ? new Date(post.date).toISOString() : undefined;
  const modifiedTime = post ? new Date(post.modified).toISOString() : undefined;
  const author = post?._embedded?.author?.[0]?.name;
  const section = post?._embedded?.["wp:term"]?.[0]?.[0]?.name;
  const tags = post?._embedded?.["wp:term"]?.[1]?.map(tag => tag.name).join(',');

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={finalRobots} />
      
      {/* Canonical URL */}
      {finalCanonical && <link rel="canonical" href={finalCanonical} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={post ? 'article' : ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />
      
      {/* Article-specific Open Graph */}
      {post && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && <meta property="article:tag" content={tags} />}
        </>
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:site" content={siteConfig.twitter} />
      <meta name="twitter:creator" content={siteConfig.twitter} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Preconnect for Critical Resources */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Custom Meta Tags */}
      {customMeta.map((meta, index) => (
        <meta
          key={index}
          {...(meta.name ? { name: meta.name } : { property: meta.property })}
          content={meta.content}
        />
      ))}
      
      {/* Inject Yoast Head Content if available */}
      {yoastHead && (
        <div dangerouslySetInnerHTML={{ __html: yoastHead }} />
      )}
      
      {/* JSON-LD Structured Data */}
      {yoastHead && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(extractStructuredData(yoastHead) || {}),
          }}
        />
      )}
      
      {/* Google Analytics - Replace with your GA4 ID */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `,
        }}
      />
    </>
  );
};

export default SEOHead; 