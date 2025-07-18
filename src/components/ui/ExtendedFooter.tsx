import React from 'react';

const ExtendedFooter = () => {
  return (
    <section className="bg-gray-100 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Legal Links */}
          <div>
            <div className="flex items-center gap-4 mb-8 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">About Us</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-blue-600 transition-colors">Editorial Policy</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-blue-600 transition-colors">DMCA Policy</a>
            </div>

            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <div>
                <strong className="text-gray-900">Note:</strong> Results may vary about any product effectiveness. The information contained in this website is provided for general informational purposes only. No medical claims are implied in this content, and the information herein is not intended be used for self-diagnosis or self-treatment of any condition.
              </div>

              <div className="space-y-3">
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">Medical Expert Board</a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">How Do We Review</a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">Review Guidelines</a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">Frequently Asked Questions</a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">Return Policy</a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">Cookie Policy/GDPR</a>
                <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">Site Map</a>
              </div>

              <div className="pt-4 border-t border-gray-300">
                <p className="text-xs text-gray-600">
                  3 E Evergreen Road #1193, New City, NY 10956<br />
                  <a href="mailto:staff@consumerhealthdigest.com" className="text-blue-600 hover:text-blue-700">staff@consumerhealthdigest.com</a><br />
                  Phone: <a href="tel:+91-712-2543006" className="text-blue-600 hover:text-blue-700">+91-712-2543006</a>
                </p>
              </div>
            </div>
          </div>

          {/* Middle Column - Disclaimer */}
          <div>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <div>
                <strong className="text-gray-900">Disclaimer:</strong> The information provided on this site is intended for your general knowledge only and is not a substitute for professional medical advice or treatment for specific medical conditions. You should not use this information to diagnose or treat a health problem or disease without consulting with a qualified healthcare provider. Please consult your healthcare provider with any questions or concerns you may have regarding your condition. Your use of this website indicates your agreement to this websites published terms of use and all site policies. Please see our <a href="#" className="text-blue-600 hover:text-blue-700">Medical Disclaimer</a> for more information.
              </div>

              <div>
                Any use of this site constitutes your agreement to the <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Use</a> and <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a> mentioned here.
              </div>

              <div>
                <a href="#" className="text-blue-600 hover:text-blue-700">Do Not Sell My Personal Information</a>
              </div>
            </div>
          </div>

          {/* Right Column - Helping the Cause */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Helping the Cause</h3>
            
            <div className="space-y-4 mb-8">
              {/* Charity Logos */}
              <div className="flex justify-center items-center space-x-6 opacity-60">
                <div className="text-center">
                  <div className="bg-gray-300 rounded-lg p-3 w-24 h-16 flex items-center justify-center mb-2">
                    <span className="text-xs font-bold text-gray-600">ARTHRITIS RESEARCH</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-300 rounded-lg p-3 w-24 h-16 flex items-center justify-center mb-2">
                    <span className="text-xs font-bold text-gray-600">American Heart Association</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="text-center">
                  <div className="bg-gray-300 rounded-lg p-3 w-32 h-16 flex items-center justify-center mb-2">
                    <span className="text-xs font-bold text-gray-600">The Jimmy Fund</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Make a Donation
            </button>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded font-bold text-lg">
                KYZOOMA
              </div>
              <p className="text-sm text-gray-600">
                All trademarks, registered trademarks and service-marks mentioned on this site are the property of their respective owners. © Copyrights 2025 <a href="#" className="text-blue-600 hover:text-blue-700">Kyzooma Media</a>. All Rights Reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <img src="https://flagcdn.com/24x18/us.png" alt="English" className="w-6 h-4" />
              <span className="text-sm text-gray-600">English</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtendedFooter; 