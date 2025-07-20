import type { Metadata } from "next";
import { siteConfig } from "./lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Temporary: Using system fonts instead of Google Fonts due to Next.js 15.4.1 + Turbopack compatibility issue
// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "health reviews",
    "wellness tips",
    "supplement reviews",
    "healthy lifestyle",
    "nutrition advice",
    "medical insights",
    "evidence-based health",
    "product reviews",
    "vitamin guides",
    "fitness tips",
    "mental health",
    "weight management",
    "beauty skincare",
    "expert health advice",
    "clinical research",
    "FDA approved supplements",
    "health product testing",
    "wellness community",
    "preventive medicine",
    "holistic health",
  ].join(", "),
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Expert Health Reviews and Wellness Tips`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitter,
    site: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
    yandex: "your-yandex-verification-code", // Optional: Yandex verification
    other: {
      "msvalidate.01": "your-bing-verification-code", // Bing verification
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": siteConfig.url,
      "x-default": siteConfig.url,
    },
  },
  category: "health",
  classification: "Health & Medical",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Additional favicon sizes */}
        <link rel="icon" href="/HealthScopeDaily.png" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/HealthScopeDaily.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme and viewport optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no" />

        {/* Security and performance headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="antialiased bg-neutral-50 font-sans">
        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>

        <div className="min-h-screen flex flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>

        {/* Schema.org organization markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              logo: {
                "@type": "ImageObject",
                url: `${siteConfig.url}/logo.png`,
              },
              sameAs: [
                "https://twitter.com/healthscopedaily",
                "https://facebook.com/healthscopedaily",
                "https://instagram.com/healthscopedaily",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
