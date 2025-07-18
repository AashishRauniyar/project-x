'use client';
import React, { useEffect, useState, useRef } from 'react';

const BrandStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    brands: 0,
    products: 0,
    reviews: 0,
    customers: 0
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: '🏢',
      label: 'Trusted Brands',
      value: 500,
      suffix: '+',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: '📦',
      label: 'Products Reviewed',
      value: 10000,
      suffix: '+',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: '⭐',
      label: 'Customer Reviews',
      value: 250000,
      suffix: '+',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: '👥',
      label: 'Happy Customers',
      value: 1000000,
      suffix: '+',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(currentStep * increment, stat.value);
        
        setCounts(prev => ({
          ...prev,
          [index === 0 ? 'brands' : index === 1 ? 'products' : index === 2 ? 'reviews' : 'customers']: Math.floor(currentValue)
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    });
  }, [isVisible]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform connects health-conscious consumers with the most trusted brands in the industry, backed by real reviews and expert recommendations.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const currentCount = index === 0 ? counts.brands : 
                               index === 1 ? counts.products : 
                               index === 2 ? counts.reviews : counts.customers;
            
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className={`w-20 h-20 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
                
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                  {index === 2 || index === 3 ? formatNumber(currentCount) : currentCount.toLocaleString()}{stat.suffix}
                </div>
                
                <div className="text-gray-600 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievement Badges */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center border border-gray-100">
            <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏆</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Leader</h3>
            <p className="text-gray-600">Recognized as the #1 platform for health brand reviews and recommendations.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Reviews</h3>
            <p className="text-gray-600">All reviews are verified from real customers who have purchased the products.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Curated</h3>
            <p className="text-gray-600">Our team of health experts carefully curates and reviews every brand on our platform.</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Trust Our Platform?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">FDA Compliant</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">Third-Party Tested</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">Expert Reviewed</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStats; 