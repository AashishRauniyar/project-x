import type { Metadata } from "next";
import type { Post, Category } from "./wordpress.d";

// Base site configuration for SEO
export const siteConfig = {
  name: "Healthy Lifestyle Tips",
  description: "Expert supplement reviews and wellness tips for a healthier lifestyle",
  url: "https://www.healthylifestyletips.online",
  ogImage: "https://www.healthylifestyletips.online/og-image.jpg",
  twitter: "@healthylifestyle",
  author: "Healthy Lifestyle Tips Team",
};

// Parse Yoast head content to extract specific meta tags
export function parseYoastHead(yoastHead: string) {
  const metaTags: Record<string, string> = {};
  
  // Extract title
  const titleMatch = yoastHead.match(/<title>(.*?)<\/title>/);
  if (titleMatch) metaTags.title = titleMatch[1];
  
  // Extract meta description
  const descMatch = yoastHead.match(/<meta name="description" content="(.*?)"/);
  if (descMatch) metaTags.description = descMatch[1];
  
  // Extract canonical URL
  const canonicalMatch = yoastHead.match(/<link rel="canonical" href="(.*?)"/);
  if (canonicalMatch) metaTags.canonical = canonicalMatch[1];
  
  // Extract robots directives
  const robotsMatch = yoastHead.match(/<meta name="robots" content="(.*?)"/);
  if (robotsMatch) metaTags.robots = robotsMatch[1];
  
  // Extract Open Graph tags
  const ogTitleMatch = yoastHead.match(/<meta property="og:title" content="(.*?)"/);
  if (ogTitleMatch) metaTags.ogTitle = ogTitleMatch[1];
  
  const ogDescMatch = yoastHead.match(/<meta property="og:description" content="(.*?)"/);
  if (ogDescMatch) metaTags.ogDescription = ogDescMatch[1];
  
  const ogImageMatch = yoastHead.match(/<meta property="og:image" content="(.*?)"/);
  if (ogImageMatch) metaTags.ogImage = ogImageMatch[1];
  
  const ogUrlMatch = yoastHead.match(/<meta property="og:url" content="(.*?)"/);
  if (ogUrlMatch) metaTags.ogUrl = ogUrlMatch[1];
  
  // Extract Twitter Card tags
  const twitterCardMatch = yoastHead.match(/<meta name="twitter:card" content="(.*?)"/);
  if (twitterCardMatch) metaTags.twitterCard = twitterCardMatch[1];
  
  const twitterTitleMatch = yoastHead.match(/<meta name="twitter:title" content="(.*?)"/);
  if (twitterTitleMatch) metaTags.twitterTitle = twitterTitleMatch[1];
  
  const twitterDescMatch = yoastHead.match(/<meta name="twitter:description" content="(.*?)"/);
  if (twitterDescMatch) metaTags.twitterDescription = twitterDescMatch[1];
  
  const twitterImageMatch = yoastHead.match(/<meta name="twitter:image" content="(.*?)"/);
  if (twitterImageMatch) metaTags.twitterImage = twitterImageMatch[1];
  
  return metaTags;
}

// Extract structured data from Yoast head
export function extractStructuredData(yoastHead: string) {
  const scriptMatch = yoastHead.match(/<script type="application\/ld\+json" class="yoast-schema-graph">([\s\S]*?)<\/script>/);
  if (scriptMatch) {
    try {
      return JSON.parse(scriptMatch[1]);
    } catch (error) {
      console.error('Error parsing Yoast structured data:', error);
      return null;
    }
  }
  return null;
}

// Generate Next.js metadata from Yoast data for posts
export function generatePostMetadata(post: Post): Metadata {
  const yoastData = post.yoast_head_json || {};
  const metaTags = parseYoastHead(post.yoast_head || '');
  
  // Use Yoast data first, fallback to post data
  const title = yoastData.title || metaTags.title || post.title.rendered;
  const description = yoastData.description || metaTags.description || 
    post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);
  
  const canonical = yoastData.canonical || metaTags.canonical || 
    `${siteConfig.url}/post/${post.slug}`;
  
  const ogImage = yoastData.og_image?.[0]?.url || metaTags.ogImage || 
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || siteConfig.ogImage;
  
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(post.modified).toISOString();
  
  // Extract author information
  const author = post._embedded?.author?.[0]?.name || siteConfig.author;
  
  // Extract categories and tags for keywords
  const categories = post._embedded?.["wp:term"]?.[0]?.map(cat => cat.name) || [];
  const tags = post._embedded?.["wp:term"]?.[1]?.map(tag => tag.name) || [];
  const keywords = [...categories, ...tags].join(', ');
  
  return {
    title,
    description,
    keywords,
    authors: [{ name: author }],
    category: categories[0] || 'Health',
    openGraph: {
      title: yoastData.og_title || metaTags.ogTitle || title,
      description: yoastData.og_description || metaTags.ogDescription || description,
      url: yoastData.og_url || metaTags.ogUrl || canonical,
      siteName: yoastData.og_site_name || siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: yoastData.og_locale || 'en_US',
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [author],
      section: categories[0] || 'Health',
      tags: tags,
    },
    twitter: {
      card: yoastData.twitter_card || metaTags.twitterCard || 'summary_large_image',
      title: yoastData.twitter_title || metaTags.twitterTitle || title,
      description: yoastData.twitter_description || metaTags.twitterDescription || description,
      images: [ogImage],
      creator: siteConfig.twitter,
    },
    robots: {
      index: yoastData.robots?.index !== false,
      follow: yoastData.robots?.follow !== false,
      googleBot: {
        index: yoastData.robots?.index !== false,
        follow: yoastData.robots?.follow !== false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical,
    },
    other: {
      'article:author': author,
      'article:published_time': publishedTime,
      'article:modified_time': modifiedTime,
      'article:section': categories[0] || 'Health',
      ...(tags.length > 0 && { 'article:tag': tags.join(',') }),
    },
  };
}

// Generate Next.js metadata from Yoast data for categories
export function generateCategoryMetadata(category: Category): Metadata {
  const yoastData = category.yoast_head_json || {};
  const metaTags = parseYoastHead(category.yoast_head || '');
  
  const title = yoastData.title || metaTags.title || 
    `${category.name} - ${siteConfig.name}`;
  const description = yoastData.description || metaTags.description || 
    category.description || `Explore articles about ${category.name}`;
  
  const canonical = yoastData.canonical || metaTags.canonical || 
    `${siteConfig.url}/category/${category.slug}`;
  
  const ogImage = yoastData.og_image?.[0]?.url || metaTags.ogImage || siteConfig.ogImage;
  
  return {
    title,
    description,
    keywords: `${category.name}, health, wellness, supplements`,
    openGraph: {
      title: yoastData.og_title || metaTags.ogTitle || title,
      description: yoastData.og_description || metaTags.ogDescription || description,
      url: yoastData.og_url || metaTags.ogUrl || canonical,
      siteName: yoastData.og_site_name || siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: yoastData.og_locale || 'en_US',
      type: 'website',
    },
    twitter: {
      card: yoastData.twitter_card || metaTags.twitterCard || 'summary_large_image',
      title: yoastData.twitter_title || metaTags.twitterTitle || title,
      description: yoastData.twitter_description || metaTags.twitterDescription || description,
      images: [ogImage],
      creator: siteConfig.twitter,
    },
    robots: {
      index: yoastData.robots?.index !== false,
      follow: yoastData.robots?.follow !== false,
      googleBot: {
        index: yoastData.robots?.index !== false,
        follow: yoastData.robots?.follow !== false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical,
    },
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbData(breadcrumbs: Array<{ label: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: index === breadcrumbs.length - 1 ? undefined : `${siteConfig.url}${crumb.href}`,
    })),
  };
}

// Generate article structured data
export function generateArticleStructuredData(post: Post) {
  const author = post._embedded?.author?.[0];
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = post._embedded?.["wp:term"]?.[0] || [];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
    image: featuredImage?.source_url || siteConfig.ogImage,
    author: {
      '@type': 'Person',
      name: author?.name || siteConfig.author,
      url: author?.link,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.modified).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/post/${post.slug}`,
    },
    articleSection: categories[0]?.name || 'Health',
    keywords: categories.map(cat => cat.name).join(', '),
  };
}

// Generate organization structured data
export function generateOrganizationData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`,
      width: 300,
      height: 100,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://twitter.com/healthylifestyle',
      'https://facebook.com/healthylifestyletips',
      'https://instagram.com/healthylifestyletips',
    ],
  };
}

// Clean HTML content for meta descriptions
export function cleanHtmlContent(html: string, maxLength: number = 160): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
    .substring(0, maxLength)
    .replace(/\.$/, '') // Remove trailing period if exists
    + (html.length > maxLength ? '...' : '');
}

// Generate SEO-friendly URL slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
} 