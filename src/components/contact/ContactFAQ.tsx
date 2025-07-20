import React from 'react';

const ContactFAQ = () => {
  const faqs = [
    {
      question: "How quickly do you respond to messages?",
      answer: "We typically respond to all inquiries within 24-48 hours during business days. For urgent medical questions, please consult with your healthcare provider."
    },
    {
      question: "Can you provide personalized medical advice?",
      answer: "We cannot provide personalized medical advice. Our content is for educational purposes only. Always consult with qualified healthcare professionals for medical decisions."
    },
    {
      question: "How do you review products?",
      answer: "Our review process involves expert analysis, scientific research review, and third-party testing when possible. We maintain strict editorial independence."
    },
    {
      question: "Do you accept product submissions for review?",
      answer: "Yes, we accept product submissions. Please use our contact form and select 'Claim Your Product' to submit your product for potential review."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find quick answers to common questions about our services and review process.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ; 