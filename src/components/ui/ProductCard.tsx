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
    const fullStars = Math.round(rating); // Always show 5 stars, round rating
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg key={i} className={`w-5 h-5 ${i < fullStars ? 'text-yellow-400' : 'text-neutral-300'} fill-current`} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className={`bg-white border border-neutral-200 rounded-2xl shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center ${className}`} style={{ minWidth: 0 }}>
      {/* Rank Badge */}
      {product.rank && (
        <div className="absolute -top-3 -left-3 z-10">
          <div className="bg-red-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-base font-bold shadow-lg border-4 border-white">#{product.rank}</div>
        </div>
      )}
      {/* Product Image */}
      {product.image && (
        <div className="mb-3 flex justify-center w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-36 h-36 object-contain rounded-xl border-2 border-primary-100 bg-white shadow-md"
          />
        </div>
      )}
      {/* Rating (number + stars) */}
      {product.rating && product.rating > 0 && (
        <div className="flex items-center gap-2 mb-2 mt-1">
          <span className="text-2xl font-extrabold text-yellow-500">{product.rating.toFixed(1)}</span>
          <div className="flex items-center">{renderStars(product.rating)}</div>
          <span className="text-base text-gray-500 font-medium">/5</span>
        </div>
      )}
      {/* Title */}
      <h3 className="text-base font-bold text-center text-neutral-900 mb-3 leading-tight line-clamp-2">{product.title}</h3>
      {/* Order Now Button */}
      {product.shopUrl && (
        <a
          href={product.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-colors duration-200 w-full text-center"
        >
          Order Now
        </a>
      )}
    </div>
  );
};

export default ProductCard; 