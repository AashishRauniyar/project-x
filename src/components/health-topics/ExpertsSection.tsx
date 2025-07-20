import React from 'react';

const ExpertsSection = () => {
  const experts = [
    {
      name: "Sophia J. Yen",
      title: "MD, MPH",
      specialty: "Women's Health",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80",
      description: "Board-certified physician specializing in women's health and reproductive medicine."
    },
    {
      name: "David Williams",
      title: "PharmD, RPh",
      specialty: "Clinical Pharmacy",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80",
      description: "Licensed pharmacist with expertise in medication therapy management."
    },
    {
      name: "Jennifer Smith",
      title: "RD, CDE",
      specialty: "Nutrition",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=150&q=80",
      description: "Registered dietitian and certified diabetes educator."
    },
    {
      name: "Michael Chen",
      title: "MD, PhD",
      specialty: "Internal Medicine",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=150&q=80",
      description: "Internal medicine physician with research background in preventive care."
    }
  ];

  const standards = [
    {
      icon: "🔬",
      title: "Science-Based",
      description: "All content is grounded in peer-reviewed research and evidence-based medicine."
    },
    {
      icon: "✅",
      title: "Expert Reviewed",
      description: "Every article is reviewed by qualified medical professionals before publication."
    },
    {
      icon: "🏆",
      title: "Quality Assured",
      description: "We maintain the highest standards of accuracy and medical integrity."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Experts Section */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Meet Our Health Experts</h2>
            <p className="text-lg text-gray-600 mb-10">
              Our team includes licensed healthcare professionals, registered dietitians, and board-certified physicians dedicated to providing you with accurate, up-to-date health information.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {experts.map((expert, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={expert.image}
                      alt={expert.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{expert.name}</h3>
                      <p className="text-blue-600 font-medium">{expert.title}</p>
                      <p className="text-sm text-gray-500">{expert.specialty}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{expert.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                Meet Our Team
              </button>
            </div>
          </div>

          {/* Editorial Standards */}
          <div>
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Editorial Standards</h3>
              
              <div className="space-y-6">
                {standards.map((standard, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
                      {standard.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">{standard.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{standard.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-white rounded-xl border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Our Commitment:</strong> We are dedicated to providing reliable, evidence-based health information that helps you make informed decisions about your wellness journey.
                </p>
              </div>
              
              <div className="mt-6 text-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300">
                  Read Editorial Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection; 