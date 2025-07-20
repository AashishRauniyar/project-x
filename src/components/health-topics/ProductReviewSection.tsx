import React from 'react';

const ProductReviewSection = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Product Review A to Z
          </h2>
          <div className="flex justify-end">
            <a href="#" className="text-red-600 font-bold text-lg hover:underline flex items-center gap-2 group">
              VIEW ALL →
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-3 md:gap-4">
            {alphabet.map((letter, index) => (
              <button
                key={index}
                className="w-12 h-12 md:w-14 md:h-14 bg-green-500 text-white font-bold text-lg md:text-xl rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                {letter}
              </button>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-6">
              Browse our comprehensive product reviews organized alphabetically. Find detailed analysis, expert opinions, and user reviews for thousands of health and wellness products.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-50 px-4 py-2 rounded-full">
                <span className="text-blue-800 font-semibold">500+ Products Reviewed</span>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-full">
                <span className="text-green-800 font-semibold">Expert Verified</span>
              </div>
              <div className="bg-purple-50 px-4 py-2 rounded-full">
                <span className="text-purple-800 font-semibold">Evidence-Based</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReviewSection; 