import { siteConfig } from "../lib/seo";

export function GET() {
  const robotsContent = `
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteConfig.url}/sitemap.xml
Sitemap: ${siteConfig.url}/sitemap-supplements.xml
Sitemap: ${siteConfig.url}/sitemap-brands.xml
Sitemap: ${siteConfig.url}/sitemap-categories.xml

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
Disallow: /search?*
Disallow: /checkout/
Disallow: /cart/
Disallow: /account/
Disallow: /login/
Disallow: /register/

# Allow specific important paths
Allow: /api/placeholder/*
Allow: /supplements/
Allow: /brands/
Allow: /categories/
Allow: /blog/
Allow: /reviews/

# Crawl delay (be respectful to search engines)
Crawl-delay: 1

# Special instructions for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /

# Block bad bots and scrapers
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: MegaIndex
Disallow: /
`.trim();

  return new Response(robotsContent, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
}
