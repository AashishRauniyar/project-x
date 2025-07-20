"use client";
import React, { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: "📘",
      url: "#",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: "#",
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      name: "Instagram",
      icon: "📷",
      url: "#",
      color: "bg-pink-600 hover:bg-pink-700",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "#",
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      name: "YouTube",
      icon: "📺",
      url: "#",
      color: "bg-red-600 hover:bg-red-700",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="w-full h-full bg-repeat opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter Content */}
          <div className="text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">📧</div>
              <h2 className="text-4xl font-bold">
                Subscribe to Our Newsletter
              </h2>
            </div>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Stay informed with health updates and information from one trusted
              health expert to your inbox. Get the latest health insights,
              wellness tips, and expert advice delivered directly to you.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-blue-100">
                  Weekly health tips from medical experts
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-blue-100">
                  Latest research and wellness trends
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-blue-100">
                  Exclusive product reviews and recommendations
                </span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Subscribe Now
                </button>
              </div>
              {isSubscribed && (
                <div className="mt-4 p-4 bg-green-500 text-white rounded-lg">
                  🎉 Thank you for subscribing! Check your email for
                  confirmation.
                </div>
              )}
            </form>

            <p className="text-sm text-blue-200">
              By subscribing, you agree to our Terms & Conditions and Privacy
              Policy. Unsubscribe at any time.
            </p>
          </div>

          {/* Social Media & Follow Section */}
          <div className="text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
              <p className="text-blue-100 mb-8">
                Stay connected on social media for daily health tips, community
                discussions, and behind-the-scenes content from our expert team.
              </p>

              <div className="flex justify-center gap-4 mb-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`w-14 h-14 ${social.color} rounded-xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">500K+</div>
                  <div className="text-blue-200 text-sm">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-blue-200 text-sm">Subscribers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
