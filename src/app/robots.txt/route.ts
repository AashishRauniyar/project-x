import { siteConfig } from '../lib/seo';

export function GET() {
  const robotsContent = `
User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteConfig.url}/sitemap.xml

# Disallow common paths that shouldn't be indexed
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/
Disallow: *.json$
Disallow: *?*utm_*
Disallow: *?*fbclid*
Disallow: *?*gclid*

# Allow specific important paths
Allow: /api/placeholder/*

# Crawl delay (optional)
Crawl-delay: 1

# Special instructions for major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /
`.trim();

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
} 