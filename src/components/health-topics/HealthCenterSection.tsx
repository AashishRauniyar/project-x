import React from 'react';

const HealthCenterSection = () => {
  const articles = [
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=300&q=80",
      title: "15 Best Diet – Weight Loss 2025: Top Picks for Effective Weight Loss",
      excerpt: "Our experts have reviewed the most effective diet plans for sustainable weight loss...",
      author: "Dr. Sarah Johnson",
      readTime: "8 min read",
      category: "Weight Loss"
    },
    {
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80",
      title: "Best Supplements in 2025: Expert-Reviewed Vitamins and Supplements",
      excerpt: "A comprehensive guide to the most effective supplements based on scientific research...",
      author: "Dr. Michael Chen",
      readTime: "12 min read",
      category: "Supplements"
    },
    {
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80",
      title: "17 Best Skin – Supplements for Skin According to Experts",
      excerpt: "Discover the top dermatologist-recommended supplements for healthy, glowing skin...",
      author: "Dr. Emily Rodriguez",
      readTime: "10 min read",
      category: "Skin Care"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Health Center: Expert Perspective on Popular Health Topics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get insights from leading healthcare professionals on the topics that matter most to your wellness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100"
            >
              <div className="overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-gray-500 text-sm">{article.readTime}</span>
                </div>
                
                <h3 className="font-bold text-lg mb-3 leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-600">
                        {article.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{article.author}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                    <span>Read more</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default HealthCenterSection; 