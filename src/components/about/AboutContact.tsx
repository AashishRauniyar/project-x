import React from 'react';

const AboutContact = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Have questions about our reviews or want to collaborate? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Contact Us
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300">
              Join Our Newsletter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContact; 