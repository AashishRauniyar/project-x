import Navbar from "@/components/ui/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/ui/Footer";

export default function NewsletterPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Newsletter", href: "/newsletter" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mt-6 mb-8 border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <svg
              className="w-10 h-10 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stay Informed with Our Newsletter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of health-conscious readers who trust our expert
            insights. Get the latest supplement reviews, health tips, and
            wellness trends delivered straight to your inbox.
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Subscribe Now
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Interests (Optional)
                </label>
                <div className="space-y-2">
                  {[
                    "Weight Loss Supplements",
                    "Anti-Aging & Beauty",
                    "Heart Health",
                    "Joint & Bone Health",
                    "Digestive Health",
                    "Mental Wellness",
                  ].map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {interest}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Subscribe to Newsletter
              </button>

              <p className="text-xs text-gray-500 text-center">
                By subscribing, you agree to our{" "}
                <a href="/privacy" className="text-primary-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                and consent to receive our newsletter.
              </p>
            </form>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What You&apos;ll Get
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    icon: "📧",
                    title: "Weekly Health Insights",
                    desc: "Latest research and health trends explained simply",
                  },
                  {
                    icon: "⭐",
                    title: "Expert Product Reviews",
                    desc: "Unbiased reviews of supplements and health products",
                  },
                  {
                    icon: "🎯",
                    title: "Personalized Tips",
                    desc: "Health advice tailored to your interests",
                  },
                  {
                    icon: "🔬",
                    title: "Research Updates",
                    desc: "Breaking news from medical studies and trials",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-2xl mr-3 mt-1">{item.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-3">
                Trusted by Health Enthusiasts
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">50k+</div>
                  <div className="text-sm text-primary-100">Subscribers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-sm text-primary-100">Rating</div>
                </div>
              </div>
              <p className="text-primary-100 text-sm mt-4">
                &quot;The best health newsletter I&apos;ve ever subscribed to.
                Clear, actionable advice!&quot; - Sarah M.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How often will I receive emails?
              </h3>
              <p className="text-gray-600 text-sm">
                We send one comprehensive newsletter per week, usually on
                Wednesdays. No spam, ever.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I unsubscribe anytime?
              </h3>
              <p className="text-gray-600 text-sm">
                Absolutely! Every email includes an easy unsubscribe link. No
                questions asked.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Is my email address safe?
              </h3>
              <p className="text-gray-600 text-sm">
                We never share or sell your email address. Your privacy is our
                top priority.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Will content be personalized?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes! Based on your interests, we&apos;ll highlight relevant
                content sections for you.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
