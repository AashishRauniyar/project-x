"use client";
import React, { useState } from 'react';

const ProductGrid = () => {
  const [filter, setFilter] = useState('All');

  const products = [
    {
      id: 1,
      name: 'Vitamin D3 5000 IU',
      brand: 'Nature Made',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80',
      price: '$19.99',
      rating: 4.8,
      reviews: 2420,
      category: 'Vitamins',
      description: 'High-potency vitamin D3 for bone and immune health',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Omega-3 Fish Oil',
      brand: 'Nordic Naturals',
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=300&q=80',
      price: '$34.95',
      rating: 4.9,
      reviews: 1856,
      category: 'Omega-3',
      description: 'Premium fish oil for heart and brain health',
      badge: 'Editor\'s Choice'
    },
    {
      id: 3,
      name: 'Multivitamin Gummies',
      brand: 'Vitafusion',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=300&q=80',
      price: '$12.99',
      rating: 4.6,
      reviews: 3245,
      category: 'Multivitamins',
      description: 'Delicious daily multivitamin gummies',
      badge: 'Popular'
    },
    {
      id: 4,
      name: 'Probiotics 50 Billion CFU',
      brand: 'Garden of Life',
      image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=300&q=80',
      price: '$44.99',
      rating: 4.7,
      reviews: 1678,
      category: 'Probiotics',
      description: 'Advanced probiotic formula for digestive health',
      badge: 'Lab Tested'
    },
    {
      id: 5,
      name: 'Magnesium Glycinate',
      brand: 'Thorne Health',
      image: 'https://images.unsplash.com/photo-1628557119992-6d7c0db0dd7b?auto=format&fit=crop&w=300&q=80',
      price: '$26.00',
      rating: 4.8,
      reviews: 987,
      category: 'Minerals',
      description: 'Highly absorbable magnesium for sleep and relaxation',
      badge: 'Doctor Recommended'
    },
    {
      id: 6,
      name: 'Turmeric Curcumin',
      brand: 'Life Extension',
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=300&q=80',
      price: '$29.75',
      rating: 4.5,
      reviews: 2134,
      category: 'Herbs',
      description: 'Potent anti-inflammatory turmeric extract',
      badge: 'Organic'
    },
    {
      id: 7,
      name: 'Whey Protein Isolate',
      brand: 'Optimum Nutrition',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80',
      price: '$54.99',
      rating: 4.9,
      reviews: 5432,
      category: 'Proteins',
      description: 'Pure whey protein for muscle building',
      badge: 'Top Rated'
    },
    {
      id: 8,
      name: 'Vitamin B Complex',
      brand: 'Nature\'s Bounty',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=300&q=80',
      price: '$16.49',
      rating: 4.4,
      reviews: 1456,
      category: 'Vitamins',
      description: 'Complete B-vitamin complex for energy',
      badge: 'Energy Boost'
    },
    {
      id: 9,
      name: 'Collagen Peptides',
      brand: 'Vital Proteins',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
      price: '$39.00',
      rating: 4.6,
      reviews: 2987,
      category: 'Proteins',
      description: 'Hydrolyzed collagen for skin and joint health',
      badge: 'Beauty'
    },
    {
      id: 10,
      name: 'Iron Bisglycinate',
      brand: 'Pure Encapsulations',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80',
      price: '$22.20',
      rating: 4.7,
      reviews: 876,
      category: 'Minerals',
      description: 'Gentle iron supplement for anemia prevention',
      badge: 'Gentle Formula'
    },
    {
      id: 11,
      name: 'CoQ10 100mg',
      brand: 'Jarrow Formulas',
      image: 'https://images.unsplash.com/photo-1628557119992-6d7c0db0dd7b?auto=format&fit=crop&w=300&q=80',
      price: '$31.95',
      rating: 4.8,
      reviews: 1234,
      category: 'Antioxidants',
      description: 'Powerful antioxidant for heart health',
      badge: 'Heart Health'
    },
    {
      id: 12,
      name: 'Ashwagandha Root',
      brand: 'Himalaya',
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=300&q=80',
      price: '$18.99',
      rating: 4.5,
      reviews: 1987,
      category: 'Herbs',
      description: 'Adaptogenic herb for stress relief',
      badge: 'Stress Relief'
    }
  ];

  const categories = ['All', 'Vitamins', 'Minerals', 'Proteins', 'Herbs', 'Probiotics', 'Omega-3', 'Multivitamins', 'Antioxidants'];

  const filteredProducts = filter === 'All' ? products : products.filter(product => product.category === filter);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Best Seller': 'bg-red-100 text-red-800',
      'Editor\'s Choice': 'bg-purple-100 text-purple-800',
      'Popular': 'bg-blue-100 text-blue-800',
      'Lab Tested': 'bg-green-100 text-green-800',
      'Doctor Recommended': 'bg-indigo-100 text-indigo-800',
      'Organic': 'bg-emerald-100 text-emerald-800',
      'Top Rated': 'bg-yellow-100 text-yellow-800',
      'Energy Boost': 'bg-orange-100 text-orange-800',
      'Beauty': 'bg-pink-100 text-pink-800',
      'Gentle Formula': 'bg-cyan-100 text-cyan-800',
      'Heart Health': 'bg-rose-100 text-rose-800',
      'Stress Relief': 'bg-violet-100 text-violet-800'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Premium Supplements & Vitamins
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our curated collection of top-rated supplements, each carefully selected and reviewed by health experts.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:scale-105"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor(product.badge)}`}>
                    {product.badge}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300">
                    <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
                </div>
                
                <h3 className="font-bold text-lg mb-2 leading-tight text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews.toLocaleString()})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">
                    {product.price}
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-300">
            Load More Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid; 