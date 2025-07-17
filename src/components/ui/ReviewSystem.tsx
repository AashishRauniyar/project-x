'use client';

import React, { useState } from 'react';

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  verified?: boolean;
}

interface ReviewSystemProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  productName: string;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({
  reviews,
  averageRating,
  totalReviews,
  productName,
}) => {
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    name: '',
    email: '',
    content: '',
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [agreed, setAgreed] = useState(false);

  const renderStars = (rating: number, interactive: boolean = false, size: string = 'w-4 h-4') => {
    const stars = [];
    const targetRating = interactive ? (hoveredRating || newReview.rating) : rating;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type={interactive ? 'button' : undefined}
          className={`${size} ${
            i <= targetRating ? 'text-yellow-400' : 'text-neutral-300'
          } fill-current ${interactive ? 'hover:text-yellow-400 cursor-pointer' : ''}`}
          onClick={interactive ? () => setNewReview({ ...newReview, rating: i }) : undefined}
          onMouseEnter={interactive ? () => setHoveredRating(i) : undefined}
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
          disabled={!interactive}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      );
    }

    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Review submitted:', newReview);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Review Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            {totalReviews} Customer Reviews for {productName}
          </h2>
          
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              {renderStars(averageRating, false, 'w-6 h-6')}
              <span className="text-2xl font-bold text-neutral-900">{averageRating}</span>
              <span className="text-neutral-600">out of 5</span>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Customer Reviews & Ratings</h3>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-neutral-200 pb-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-neutral-900">{review.author}</span>
                      {review.verified && (
                        <span className="text-xs bg-secondary-100 text-secondary-800 px-2 py-1 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                    <time className="text-sm text-neutral-500">
                      {formatDate(review.date)}
                    </time>
                  </div>
                  {renderStars(review.rating)}
                </div>
                
                <h4 className="font-medium text-neutral-900 mb-2">{review.title}</h4>
                <p className="text-neutral-700 leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Write a Review Form */}
        <div className="bg-neutral-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Write a Review</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Review Title */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Review Headline
              </label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="I would buy this product again and again"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                YOUR RATING:
              </label>
              {renderStars(newReview.rating, true, 'w-8 h-8')}
            </div>

            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={newReview.email}
                  onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Review Content */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Your Review :
              </label>
              <textarea
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                rows={5}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <div className="text-sm text-neutral-500 mt-1">
                {5000 - newReview.content.length} characters remaining.
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Upload attachment
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Privacy Agreement */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="privacy"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                required
              />
              <label htmlFor="privacy" className="text-sm text-neutral-600">
                <strong>Privacy Policy</strong>
                <br />
                <em>
                  Submitting this review means that you agree to our Review Guidelines, confirming that you are a verified customer who has purchased the product and may have used the merchandise or experienced the service, and providing only a real interaction and experience without ulterior motives or has an affiliate or business with the company in any way. By ticking this box and submitting this review, you also accept that submitting fake reviews is a violation of Consumer Health Digest's Terms of Use and such conduct will not be tolerated.
                </em>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={!agreed || newReview.rating === 0}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                SUBMIT REVIEW
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewSystem; 