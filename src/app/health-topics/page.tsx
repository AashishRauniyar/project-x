import React from 'react';
import HeroSection from '@/components/health-topics/HeroSection';
import AnswersSection from '@/components/health-topics/AnswersSection';
import HealthCenterSection from '@/components/health-topics/HealthCenterSection';
import ProductReviewSection from '@/components/health-topics/ProductReviewSection';
import ExpertsSection from '@/components/health-topics/ExpertsSection';
import CategorySection from '@/components/health-topics/CategorySection';
import ExploreTopicsSection from '@/components/health-topics/ExploreTopicsSection';
import NewsletterSection from '@/components/health-topics/NewsletterSection';
import LandingFooter from '@/components/ui/LandingFooter';
import ExtendedFooter from '@/components/ui/ExtendedFooter';

const HealthTopicsPage = () => {
  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* The Answers You Need */}
      <AnswersSection />
      
      {/* Health Center Expert Perspective */}
      <HealthCenterSection />
      
      {/* Product Review A to Z */}
      <ProductReviewSection />
      
      {/* Meet Our Health Experts */}
      <ExpertsSection />
      
      {/* Category Sections */}
      <CategorySection 
        title="Weight Loss Center"
        viewAllText="VIEW ALL →"
        items={[
          {
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80",
            title: "15 Best Diet Plans and Weight Loss 2025: Top Picks for Effective Weight Loss",
            author: "By Melissa",
            readTime: "17 Min Read"
          },
          {
            image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&q=80", 
            title: "10 Best Supplements for Kids: What Every Kid's According to Experts",
            author: "By John",
            readTime: "12 Min Read"
          },
          {
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
            title: "12 Best Weight Loss Products 2025: According to Dietitian Experts",
            author: "By Sarah",
            readTime: "15 Min Read"
          }
        ]}
      />
      
      <CategorySection 
        title="Skin Care"
        viewAllText="VIEW ALL →"
        items={[
          {
            image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80",
            title: "10 Best Super-hydration Serum-Based Products",
            author: "By Dr. Emma",
            readTime: "10 Min Read"
          },
          {
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80",
            title: "Top 15 Best Vitamin C Serums for All Skin Types",
            author: "By Lisa",
            readTime: "14 Min Read"
          },
          {
            image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=300&q=80",
            title: "20 Best Sunscreen Products According to Dermatologists",
            author: "By Dr. James",
            readTime: "11 Min Read"
          }
        ]}
      />
      
      <CategorySection 
        title="Joint Pain"
        viewAllText="VIEW ALL →"
        items={[
          {
            image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80",
            title: "Ellie Strong Unboxing the Secrets to Joint Pain Treatment",
            author: "By Dr. Wilson",
            readTime: "16 Min Read"
          },
          {
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=300&q=80",
            title: "Cracking the Code: Understanding the Signs of Joint Pain",
            author: "By Dr. Martinez",
            readTime: "13 Min Read"
          },
          {
            image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=300&q=80",
            title: "Top 5 Herbal Remedies for Marine Fish Relief",
            author: "By Dr. Chen",
            readTime: "9 Min Read"
          }
        ]}
      />
      
      <CategorySection 
        title="General Health"
        viewAllText="VIEW ALL →"
        items={[
          {
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
            title: "How to Boost Foot Health: Diabetes to Toe Deformations",
            author: "By Dr. Rodriguez",
            readTime: "18 Min Read"
          },
          {
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80",
            title: "What Is Available In The Diagnostic Business Analyst: Things to Consider",
            author: "By Dr. Thompson",
            readTime: "20 Min Read"
          },
          {
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
            title: "15 Top of Mind Diet Adherence 2025: According to a Urologist's Sleep Techniques",
            author: "By Dr. Patel",
            readTime: "14 Min Read"
          }
        ]}
      />
      
      {/* Explore Topics */}
      <ExploreTopicsSection />
      
      {/* Newsletter Section */}
      <NewsletterSection />
      
      {/* Footers */}
      <LandingFooter />
      <ExtendedFooter />
    </div>
  );
};

export default HealthTopicsPage; 