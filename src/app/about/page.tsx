import React from "react";
import { Metadata } from "next";
import {
  generateMetadata as genMeta,
  generateWebPageStructuredData,
  generateHealthKeywords,
  injectStructuredData,
} from "@/app/lib/seo-utils";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutTeam from "@/components/about/AboutTeam";
import AboutValues from "@/components/about/AboutValues";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutStats from "@/components/about/AboutStats";
import AboutTestimonials from "@/components/about/AboutTestimonials";
import AboutContact from "@/components/about/AboutContact";

export const metadata: Metadata = genMeta({
  title: "About HealthScopeDaily - Expert Health & Wellness Reviews",
  description:
    "Learn about HealthScopeDaily's mission to provide expert health and wellness reviews. Meet our team of health professionals, discover our values, and see why millions trust our recommendations.",
  canonical: "/about",
  type: "website",
  tags: generateHealthKeywords("about", [
    "about us",
    "health experts",
    "medical professionals",
    "wellness team",
    "health review team",
    "expert credentials",
    "company mission",
    "health advocacy",
    "medical expertise",
    "trusted reviews",
  ]).split(", "),
});

const AboutPage = () => {
  const structuredData = generateWebPageStructuredData({
    name: "About HealthScopeDaily - Expert Health & Wellness Reviews",
    description:
      "Learn about HealthScopeDaily's mission, team, and commitment to providing expert health and wellness reviews",
    url: "https://healthscopedaily.com/about",
    breadcrumbs: [
      { name: "Home", url: "https://healthscopedaily.com" },
      { name: "About Us", url: "https://healthscopedaily.com/about" },
    ],
  });

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      {injectStructuredData(structuredData)}

      {/* Hero Section */}
      <AboutHero />

      {/* Mission Section */}
      <AboutMission />

      {/* Stats Section */}
      <AboutStats />

      {/* Values Section */}
      <AboutValues />

      {/* Team Section */}
      <AboutTeam />

      {/* Timeline Section */}
      <AboutTimeline />

      {/* Testimonials Section */}
      <AboutTestimonials />

      {/* Contact Section */}
      <AboutContact />
    </div>
  );
};

export default AboutPage;
