import React from 'react';
import Link from 'next/link';

interface ArticleHeroProps {
  title: string;
  description: string;
  author: {
    name: string;
    href: string;
    image?: string;
  };
  reviewer?: {
    name: string;
    href: string;
    credentials: string;
    image?: string;
  };
  updatedDate: string;
  rating: number;
  reviewCount: number;
  isMedicallyCited?: boolean;
  isFactChecked?: boolean;
}

const ArticleHero: React.FC<ArticleHeroProps> = ({
  title,
  description,
  author,
  reviewer,
  updatedDate,
  rating,
  reviewCount,
  isMedicallyCited = true,
  isFactChecked = true,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-neutral-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and Description */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-neutral-700 leading-relaxed max-w-4xl">
            {description}
          </p>
        </div>

        {/* Author and Meta Information */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="flex flex-col space-y-4">
            {/* Author Info */}
            <div className="flex items-center space-x-3">
              {author.image && (
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-neutral-600">Written By</span>
                  <Link
                    href={author.href}
                    className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                  >
                    {author.name}
                  </Link>
                </div>
              </div>
            </div>

            {/* Reviewer Info */}
            {reviewer && (
              <div className="flex items-center space-x-3">
                {reviewer.image && (
                  <img
                    src={reviewer.image}
                    alt={reviewer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-neutral-600">Reviewed by</span>
                    <Link
                      href={reviewer.href}
                      className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                    >
                      {reviewer.name}, {reviewer.credentials}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Update Date */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-neutral-600">Updated:</span>
              <span className="text-sm text-neutral-700">{updatedDate}</span>
            </div>
          </div>

          {/* Trust Signals and Meta Actions */}
          <div className="flex flex-col space-y-4">
            {/* Trust Badges */}
            <div className="flex items-center space-x-4">
              {isMedicallyCited && (
                <Link href="#References" className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Medically Cited</span>
                </Link>
              )}
              <span className="text-neutral-400">|</span>
              {isFactChecked && (
                <div className="flex items-center space-x-2 text-sm text-secondary-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Fact Checked</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons and Stats */}
        <div className="flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-6">
          {/* Rating and Reviews */}
          <Link href="#comments" className="flex items-center space-x-2 text-sm text-neutral-700 hover:text-primary-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7" />
            </svg>
            <span>{reviewCount} Reviews</span>
            <div className="flex items-center space-x-1">
              {renderStars(rating)}
              <span className="font-semibold text-neutral-900 ml-1">{rating}</span>
              <span className="text-neutral-500">out of 5</span>
            </div>
          </Link>

          {/* Specs */}
          <Link href="#Specs" className="flex items-center space-x-2 text-sm text-neutral-700 hover:text-primary-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Specs</span>
          </Link>

          {/* Ask a Question */}
          <Link href="#Ques-Answ" className="flex items-center space-x-2 text-sm text-neutral-700 hover:text-primary-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Ask a Question</span>
          </Link>

          {/* Write a Review */}
          <Link href="#Reviewstab" className="flex items-center space-x-2 text-sm text-neutral-700 hover:text-primary-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Write a Review</span>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
          <p className="text-sm text-neutral-600">
            We independently research, review, and recommend the best products. Healthcare professionals review articles for medical accuracy. When you buy through our links, we may earn a commission. Read more about{' '}
            <Link
              href="/how-do-we-do-reviews#disclmrtxt"
              className="text-primary-600 hover:text-primary-800 underline"
            >
              our process for evaluating brands and products.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleHero; 