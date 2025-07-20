import React from "react";

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8 xl:gap-12">
          {/* For Medical Professionals */}
          <div className="xl:col-span-1">
            <h4 className="font-bold text-lg mb-6 text-white">
              For Medical Professionals
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Become a Contributor
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Top Contributors
                </a>
              </li>
            </ul>

            <h4 className="font-bold text-lg mb-6 mt-10 text-white">
              For Non Governmental Organizations (NGO's)
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Health Awareness Program
                </a>
              </li>
            </ul>

            <h4 className="font-bold text-lg mb-6 mt-10 text-white">
              For the Media
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Press & Media Requests
                </a>
              </li>
            </ul>

            <h4 className="font-bold text-lg mb-6 mt-10 text-white">
              For Advertising
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Advertise with Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Advertising Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Disclosure Statement
                </a>
              </li>
            </ul>
          </div>

          {/* For Product Owner */}
          <div className="xl:col-span-1">
            <h4 className="font-bold text-lg mb-6 text-white">
              For Product Owner
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Claim Your Product
                </a>
              </li>
            </ul>

            <h4 className="font-bold text-lg mb-6 text-white mt-10">
              For User
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Content Feedback
                </a>
              </li>
            </ul>

            <h4 className="font-bold text-lg mb-6 text-white mt-10">
              For Article Reviewers
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Apply to be a reviewer
                </a>
              </li>
            </ul>

            <h4 className="font-bold text-lg mb-6 text-white mt-10">
              For Feedback & Suggestion
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Consumer Health Digest */}
          <div className="xl:col-span-2 lg:col-span-2">
            <h4 className="font-bold text-lg mb-6 text-white">
              Follow Consumer Health Digest
            </h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {/* Social Media Icons */}
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.69-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-pink-500 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="xl:col-span-2 lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-4 text-white">
                Get Our Newsletter
              </h4>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Join our newsletter for the latest information and advice on
                staying healthy, fitness, nutrition, skincare, product reviews,
                and more.
              </p>

              <form className="space-y-4">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Email Address..."
                    className="flex-1 px-4 py-3 text-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-r-md hover:bg-blue-700 transition-colors duration-300 font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <p className="text-xs text-gray-400 mt-4">
                Your{" "}
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  privacy
                </a>{" "}
                is important to us
              </p>
            </div>

            {/* Language Selector */}
            <div className="mt-8 flex items-center justify-end gap-2">
              <img
                src="https://flagcdn.com/24x18/us.png"
                alt="English"
                className="w-6 h-4"
              />
              <span className="text-sm text-gray-300">English</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
