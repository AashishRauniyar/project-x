import React from 'react';

const ExploreTopicsSection = () => {
  const topics = [
    {
      title: "Heart Health",
      icon: "❤️",
      description: "Cardiovascular wellness and prevention",
      color: "bg-red-100 text-red-800"
    },
    {
      title: "Nutrition Guide",
      icon: "🥗",
      description: "Healthy eating and dietary advice",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Mental Health",
      icon: "🧠",
      description: "Mental wellness and stress management",
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Fitness Tips",
      icon: "💪",
      description: "Exercise routines and fitness guidance",
      color: "bg-orange-100 text-orange-800"
    },
    {
      title: "Sleep Health",
      icon: "😴",
      description: "Better sleep and rest optimization",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Women's Health",
      icon: "👩",
      description: "Women-specific health topics",
      color: "bg-pink-100 text-pink-800"
    },
    {
      title: "Men's Health",
      icon: "👨",
      description: "Men-specific wellness guidance",
      color: "bg-indigo-100 text-indigo-800"
    },
    {
      title: "Senior Care",
      icon: "👴",
      description: "Health tips for older adults",
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Explore Topics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover comprehensive health information across a wide range of topics. From preventive care to treatment options, find expert-backed guidance for every aspect of your health journey.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {topics.map((topic, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:scale-105"
            >
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {topic.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {topic.description}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${topic.color}`}>
                  Explore Now
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Topics
          </button>
        </div>

        {/* Featured Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-gray-600">Health Articles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Expert Contributors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
            <div className="text-gray-600">Health Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">2M+</div>
            <div className="text-gray-600">Monthly Readers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreTopicsSection; 