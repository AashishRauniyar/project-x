'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/general/about-us' },
      { label: 'Editorial Policy', href: '/general/editorial-policy' },
      { label: 'DMCA Policy', href: '/general/dmca-policy' },
    ],
    resources: [
      { label: 'Medical Expert Board', href: '/medical-expert' },
      { label: 'How Do We Review', href: '/how-do-we-do-reviews' },
      { label: 'Review Guidelines', href: '/review-guidelines' },
      { label: 'Frequently Asked Questions', href: '/frequently-asked-questions' },
      { label: 'Return Policy', href: '/general/return-policy' },
      { label: 'Cookie Policy/GDPR', href: '/general/cookie-policy' },
      { label: 'Site Map', href: '/general/sitemap' },
    ],
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/ConsumerHealthDigest',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/user/ConsumerHealthDigest',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: 'https://www.pinterest.com/ConsmerHDigest/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.09.109.104.205.077.315-.085.36-.278 1.122-.315 1.279-.053.225-.174.271-.402.165-1.499-.69-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/ConsumerHDigest',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/consumerhealthdigest/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 7.989.013 6.77.072 5.551.132 4.708.333 3.995.63a6.518 6.518 0 0 0-2.356 1.533A6.52 6.52 0 0 0 .107 4.519c-.297.713-.498 1.556-.558 2.775C.013 8.515 0 8.922 0 12.543s.013 4.028.072 5.247c.06 1.219.261 2.062.558 2.775.297.712.728 1.315 1.533 2.12a6.52 6.52 0 0 0 2.356 1.533c.713.297 1.556.498 2.775.558 1.219.059 1.626.072 5.247.072s4.028-.013 5.247-.072c1.219-.06 2.062-.261 2.775-.558a6.518 6.518 0 0 0 2.356-1.533 6.52 6.52 0 0 0 1.533-2.356c.297-.713.498-1.556.558-2.775.059-1.219.072-1.626.072-5.247s-.013-4.028-.072-5.247c-.06-1.219-.261-2.062-.558-2.775a6.518 6.518 0 0 0-1.533-2.356A6.52 6.52 0 0 0 19.368.63c-.713-.297-1.556-.498-2.775-.558C15.374.013 14.967 0 11.346 0h.671zm-.056 5.83c-3.399 0-6.158 2.759-6.158 6.158s2.759 6.158 6.158 6.158 6.158-2.759 6.158-6.158-2.759-6.158-6.158-6.158zm0 10.155a3.996 3.996 0 1 1 0-7.993 3.996 3.996 0 0 1 0 7.993zM19.741 5.58a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/consumer-health-digest/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@consumerhealthdigest',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-neutral-800 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-r-lg font-medium transition-colors duration-200"
              >
                Submit
              </button>
            </form>
            <p className="text-sm text-neutral-400 mt-4">
              Spam-free newsletters directly from our health experts and professionals.
            </p>
            <p className="text-sm text-neutral-400">
              Your{' '}
              <Link href="/general/privacy-policy" className="text-primary-400 hover:text-primary-300">
                privacy
              </Link>{' '}
              is important to us
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-neutral-400">
              <p>3 E Evergreen Road #1193, New City, NY 10956</p>
              <p>
                <Link
                  href="mailto:staff@consumerhealthdigest.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  staff@consumerhealthdigest.com
                </Link>
              </p>
              <p>
                Phone:{' '}
                <Link
                  href="tel:+91-712-2543006"
                  className="hover:text-white transition-colors duration-200"
                >
                  +91-712-2543006
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-neutral-700">
          <div className="text-sm text-neutral-400 space-y-4">
            <p>
              <strong>Note:</strong> Results may vary about any product effectiveness. The information contained in this website is provided for general informational purposes only. No medical claims are implied in this content, and the information herein is not intended be used for self-diagnosis or self-treatment of any condition.
            </p>
            
            <p>
              <strong>Disclaimer:</strong> The information provided on this site is intended for your general knowledge only and is not a substitute for professional medical advice or treatment for specific medical conditions. You should not use this information to diagnose or treat a health problem or disease without consulting with a qualified healthcare provider. Please consult your healthcare provider with any questions or concerns you may have regarding your condition. Your use of this website indicates your agreement to this websites published terms of use and all site policies. Please see our{' '}
              <Link href="/medical-disclaimer" className="text-primary-400 hover:text-primary-300">
                Medical Disclaimer
              </Link>{' '}
              for more information.
            </p>

            <p>
              Any use of this site constitutes your agreement to the{' '}
              <Link href="/general/termsofuse" className="text-primary-400 hover:text-primary-300">
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link href="/general/privacy-policy" className="text-primary-400 hover:text-primary-300">
                Privacy Policy
              </Link>{' '}
              mentioned here.
            </p>

            <p>
              <Link href="/general/california-privacy-notice" className="text-primary-400 hover:text-primary-300">
                Do Not Sell My Personal Information
              </Link>
            </p>
          </div>
        </div>

        {/* Charity Section */}
        <div className="mt-8 pt-8 border-t border-neutral-700">
          <h3 className="text-lg font-semibold mb-4">Helping the Cause</h3>
          <div className="flex items-center justify-center space-x-8 mb-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-700 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-xs font-semibold">CURE</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-700 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-xs font-semibold">❤️</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-700 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-xs font-semibold">JIMMY</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/ngo-support"
              className="text-primary-400 hover:text-primary-300 transition-colors duration-200"
            >
              Make a Donation
            </Link>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-8 pt-8 border-t border-neutral-700">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-neutral-400 hover:text-white transition-colors duration-200"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-neutral-700 text-center">
          <div className="flex items-center justify-center mb-4">
            <Link href="https://www.kyzooma.com/" className="text-neutral-400 hover:text-white transition-colors duration-200">
              <span className="text-sm">KYZOOMA.COM : NEXT-GEN MEDIA, TIMELESS BRANDS.</span>
            </Link>
          </div>
          <p className="text-sm text-neutral-400">
            All trademarks, registered trademarks and service-marks mentioned on this site are the property of their respective owners. © Copyrights 2025{' '}
            <Link href="https://www.kyzooma.com/brands/" className="text-primary-400 hover:text-primary-300">
              Kyzooma Media
            </Link>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 