import { getAllPosts, getAllCategories } from '../lib/wordpress';
import { siteConfig } from '../lib/seo';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

function generateXmlUrl(url: SitemapUrl): string {
  let xmlUrl = `  <url>\n    <loc>${url.loc}</loc>`;
  
  if (url.lastmod) {
    xmlUrl += `\n    <lastmod>${url.lastmod}</lastmod>`;
  }
  
  if (url.changefreq) {
    xmlUrl += `\n    <changefreq>${url.changefreq}</changefreq>`;
  }
  
  if (url.priority !== undefined) {
    xmlUrl += `\n    <priority>${url.priority.toFixed(1)}</priority>`;
  }
  
  xmlUrl += '\n  </url>';
  return xmlUrl;
}

export async function GET() {
  try {
    const urls: SitemapUrl[] = [];
    
    // Add homepage
    urls.push({
      loc: siteConfig.url,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 1.0,
    });
    
    // Add static pages
    const staticPages = [
      { path: '/blog', changefreq: 'daily' as const, priority: 0.9 },
      { path: '/categories', changefreq: 'weekly' as const, priority: 0.8 },
      { path: '/reviews', changefreq: 'weekly' as const, priority: 0.8 },
      { path: '/about', changefreq: 'monthly' as const, priority: 0.6 },
      { path: '/newsletter', changefreq: 'monthly' as const, priority: 0.5 },
    ];
    
    staticPages.forEach(page => {
      urls.push({
        loc: `${siteConfig.url}${page.path}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: page.changefreq,
        priority: page.priority,
      });
    });
    
    // Fetch and add posts
    try {
      const posts = await getAllPosts();
      posts.forEach(post => {
        urls.push({
          loc: `${siteConfig.url}/post/${post.slug}`,
          lastmod: new Date(post.modified).toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.7,
        });
      });
    } catch (error) {
      console.error('Error fetching posts for sitemap:', error);
    }
    
    // Fetch and add categories
    try {
      const categories = await getAllCategories();
      const validCategories = categories.filter(cat => 
        cat.name !== 'Uncategorized' && cat.count > 0
      );
      
      validCategories.forEach(category => {
        urls.push({
          loc: `${siteConfig.url}/category/${category.slug}`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.6,
        });
      });
    } catch (error) {
      console.error('Error fetching categories for sitemap:', error);
    }
    
    // Generate XML
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(url => generateXmlUrl(url)).join('\n')}
</urlset>`;

    return new Response(xmlContent, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a basic sitemap if there's an error
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
} 