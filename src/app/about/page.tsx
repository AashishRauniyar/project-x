import Navbar from "@/components/ui/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/ui/Footer";

export default function AboutPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      credentials: "MD, Internal Medicine",
      image: "/api/placeholder/150x150",
      bio: "15+ years in preventive medicine and nutritional health research."
    },
    {
      name: "Michael Chen",
      role: "Lead Researcher",
      credentials: "PhD, Nutritional Science",
      image: "/api/placeholder/150x150",
      bio: "Specialized in supplement efficacy and bioavailability studies."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Wellness Expert",
      credentials: "PhD, Holistic Health",
      image: "/api/placeholder/150x150",
      bio: "Expert in integrative health approaches and lifestyle medicine."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mt-6 mb-8 border border-gray-100">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About Consumer Health Digest</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Your trusted source for evidence-based health information since 2013. We provide unbiased reviews, expert insights, and reliable guidance to help you make informed health decisions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Evidence-Based</h3>
                <p className="text-gray-600 text-sm">All our reviews are backed by scientific research and clinical studies.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h3>
                <p className="text-gray-600 text-sm">Medical doctors and health professionals review all content.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unbiased Reviews</h3>
                <p className="text-gray-600 text-sm">Independent testing and honest assessments of health products.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Our Mission */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At Consumer Health Digest, we believe everyone deserves access to accurate, trustworthy health information. In a world filled with health misinformation and misleading marketing claims, we cut through the noise to deliver clear, evidence-based guidance.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our team of medical professionals and researchers rigorously evaluates health products, supplements, and wellness trends to help you make informed decisions about your health and well-being.
            </p>
            <div className="flex items-center text-primary-600 font-medium">
              <span>Trusted by millions since 2013</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Our Process */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Review Process</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Research & Analysis</h3>
                  <p className="text-gray-600 text-sm">We examine scientific studies, ingredient profiles, and clinical data.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Review</h3>
                  <p className="text-gray-600 text-sm">Medical professionals evaluate safety, efficacy, and potential interactions.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Independent Testing</h3>
                  <p className="text-gray-600 text-sm">When possible, we conduct third-party testing for quality verification.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Publication</h3>
                  <p className="text-gray-600 text-sm">Comprehensive reviews with clear recommendations and ratings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our diverse team of medical professionals, researchers, and health experts ensures every piece of content meets the highest standards of accuracy and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-1">{member.role}</p>
                <p className="text-gray-500 text-sm mb-3">{member.credentials}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Recognition */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-6">Trusted by Health Professionals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold mb-1">10M+</div>
              <div className="text-primary-100 text-sm">Monthly Readers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">500+</div>
              <div className="text-primary-100 text-sm">Products Reviewed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">25+</div>
              <div className="text-primary-100 text-sm">Medical Experts</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">11+</div>
              <div className="text-primary-100 text-sm">Years Experience</div>
            </div>
          </div>
          <p className="text-primary-100 max-w-2xl mx-auto">
            "Consumer Health Digest has become our go-to resource for evidence-based supplement information. Their thorough reviews save us valuable time in our clinical practice." - Dr. Jennifer Martinez, Family Medicine
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 