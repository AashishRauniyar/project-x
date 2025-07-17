import type { Metadata } from "next";
import "./globals.css";

// Temporary: Using system fonts instead of Google Fonts due to Next.js 15.4.1 + Turbopack compatibility issue
// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Consumer Health Digest - Your Trusted Source For Good Health",
  description: "Trusted health reviews, expert advice, and quality insights. Evidence-based health and wellness information with unbiased product reviews.",
  keywords: "health reviews, medical advice, wellness, supplements, skincare, health products",
  authors: [{ name: "Consumer Health Digest Staff" }],
  openGraph: {
    title: "Consumer Health Digest - Your Trusted Source For Good Health",
    description: "Trusted health reviews, expert advice, and quality insights.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consumer Health Digest - Your Trusted Source For Good Health",
    description: "Trusted health reviews, expert advice, and quality insights.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.consumerhealthdigest.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="antialiased bg-neutral-50 font-sans">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
