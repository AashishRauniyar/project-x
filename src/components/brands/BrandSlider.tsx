'use client';
import React, { useEffect, useRef } from 'react';

const BrandSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const brands = [
    { name: 'Optimum Nutrition', logo: 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=ON' },
    { name: 'Garden of Life', logo: 'https://via.placeholder.com/150x80/10B981/FFFFFF?text=GOL' },
    { name: 'Nature Made', logo: 'https://via.placeholder.com/150x80/F59E0B/FFFFFF?text=NM' },
    { name: 'Thorne Health', logo: 'https://via.placeholder.com/150x80/EF4444/FFFFFF?text=TH' },
    { name: 'Athletic Greens', logo: 'https://via.placeholder.com/150x80/059669/FFFFFF?text=AG' },
    { name: 'Ritual', logo: 'https://via.placeholder.com/150x80/8B5CF6/FFFFFF?text=RT' },
    { name: 'Life Extension', logo: 'https://via.placeholder.com/150x80/06B6D4/FFFFFF?text=LE' },
    { name: 'Nordic Naturals', logo: 'https://via.placeholder.com/150x80/3B82F6/FFFFFF?text=NN' },
    { name: 'NOW Foods', logo: 'https://via.placeholder.com/150x80/F97316/FFFFFF?text=NOW' },
    { name: 'Pure Encapsulations', logo: 'https://via.placeholder.com/150x80/84CC16/FFFFFF?text=PE' },
    { name: 'Solgar', logo: 'https://via.placeholder.com/150x80/EC4899/FFFFFF?text=SOL' },
    { name: 'Jarrow Formulas', logo: 'https://via.placeholder.com/150x80/6366F1/FFFFFF?text=JF' },
    { name: 'Country Life', logo: 'https://via.placeholder.com/150x80/14B8A6/FFFFFF?text=CL' },
    { name: 'New Chapter', logo: 'https://via.placeholder.com/150x80/F43F5E/FFFFFF?text=NC' },
    { name: 'Source Naturals', logo: 'https://via.placeholder.com/150x80/A855F7/FFFFFF?text=SN' },
    { name: 'Swanson', logo: 'https://via.placeholder.com/150x80/0EA5E9/FFFFFF?text=SW' }
  ];

  // Duplicate brands for infinite scroll effect
  const duplicatedBrands = [...brands, ...brands];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId: number;
    let translateX = 0;
    const speed = 0.5; // pixels per frame
    const brandWidth = 200; // width + margin
    const totalWidth = brands.length * brandWidth;

    const animate = () => {
      translateX -= speed;
      
      // Reset position when first set of brands is completely scrolled
      if (Math.abs(translateX) >= totalWidth) {
        translateX = 0;
      }
      
      slider.style.transform = `translateX(${translateX}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Leading Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partnering with the world's most respected health and wellness brands to bring you quality products and expert recommendations.
          </p>
        </div>

        {/* Auto-sliding brand logos */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              ref={sliderRef}
              className="flex items-center gap-8 will-change-transform"
              style={{ width: `${duplicatedBrands.length * 200}px` }}
            >
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex-shrink-0 w-44 h-24 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border border-gray-100"
                >
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>

        {/* Brand categories pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {['Supplements', 'Skincare', 'Fitness', 'Nutrition', 'Wellness', 'Medical'].map((category, index) => (
            <span
              key={index}
              className="px-6 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-blue-300 hover:text-blue-700 transition-all duration-300 cursor-pointer hover:shadow-md"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            View All Brands
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandSlider; 