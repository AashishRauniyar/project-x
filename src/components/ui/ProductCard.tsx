import React from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  rank?: number;
  title: string;
  image: string;
  price: string;
  shopUrl: string;
  reviewUrl?: string;
  description: string;
  keyIngredients: string[];
  benefits: string[];
  rating?: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
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
            <linearGradient id={`half-fill-${product.id}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill={`url(#half-fill-${product.id})`} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
    <div className={`bg-white border border-neutral-200 rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300 ${className}`}>
      {/* Rank Badge */}
      {product.rank && (
        <div className="relative">
          <div className="absolute -top-2 -left-2 z-10">
            <div className="bg-accent-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              #{product.rank}
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header with Title and Link */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-neutral-900 mb-2">
            {product.reviewUrl ? (
              <Link
                href={product.reviewUrl}
                className="hover:text-primary-600 transition-colors duration-200"
              >
                {product.title}
              </Link>
            ) : (
              product.title
            )}
          </h3>
        </div>

        {/* Product Image */}
        <div className="mb-4 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Price and CTA */}
        <div className="mb-4 text-center">
          <div className="text-2xl font-bold text-primary-600 mb-3">
            {product.price}
          </div>
          <Link
            href={product.shopUrl}
            className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-700 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Key Ingredients */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-neutral-900 mb-2">Key Ingredients:</h4>
          <p className="text-sm text-neutral-600">
            {product.keyIngredients.join(', ')}
          </p>
        </div>

        {/* Price Info */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-neutral-900 mb-2">Price:</h4>
          <p className="text-sm text-neutral-600">{product.price}</p>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-neutral-900 mb-2">What It Does:</h4>
          <p className="text-sm text-neutral-600">
            {product.benefits.join(', ')}
          </p>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center justify-center space-x-1 pt-4 border-t border-neutral-100">
            {renderStars(product.rating)}
            <span className="text-sm text-neutral-600 ml-2">({product.rating}/5)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 