import React from "react";
import { Metadata } from "next";
import {
  generateMetadata as genMeta,
  generateWebPageStructuredData,
  generateHealthKeywords,
  injectStructuredData,
} from "@/app/lib/seo-utils";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactNewsletter from "@/components/contact/ContactNewsletter";

export const metadata: Metadata = genMeta({
  title: "Contact Us - Get Expert Health Support | HealthScopeDaily",
  description:
    "Contact HealthScopeDaily for health questions, feedback, or collaboration opportunities. Our expert team is here to help with personalized health guidance and support.",
  canonical: "/contact",
  type: "website",
  tags: generateHealthKeywords("contact", [
    "contact us",
    "health support",
    "expert consultation",
    "customer service",
    "health questions",
    "feedback",
    "collaboration",
    "medical inquiry",
    "wellness support",
    "help center",
  ]).split(", "),
});

const ContactPage = () => {
  const structuredData = generateWebPageStructuredData({
    name: "Contact HealthScopeDaily - Expert Health Support",
    description:
      "Contact our team of health experts for personalized guidance and support",
    url: "https://healthscopedaily.com/contact",
    breadcrumbs: [
      { name: "Home", url: "https://healthscopedaily.com" },
      { name: "Contact Us", url: "https://healthscopedaily.com/contact" },
    ],
  });

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      {injectStructuredData(structuredData)}

      {/* Hero Section */}
      <ContactHero />

      {/* Contact Information */}
      <ContactInfo />

      {/* Contact Form */}
      <ContactForm />

      {/* FAQ Section */}
      <ContactFAQ />

      {/* Newsletter Section */}
      <ContactNewsletter />
    </div>
  );
};

export default ContactPage;
