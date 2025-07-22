import Link from 'next/link';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface ProductCardProps {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  features?: string[];
  colors?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export default function ProductCard({
  id,
  name,
  brand,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  category,
  features = [],
  colors = [],
  inStock = true,
  isNew = false,
  isSale = false
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      {/* Product Image */}
      <div className="relative p-6">
        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-sm">{category}</span>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </span>
          )}
          {isSale && discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          {!inStock && (
            <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
              OUT OF STOCK
            </span>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          {isWishlisted ? (
            <HeartIcon className="w-4 h-4 text-red-500" />
          ) : (
            <HeartOutlineIcon className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="px-6 pb-6">
        <div className="text-sm text-gray-500 mb-1">{brand}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {rating} ({reviews})
          </span>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="space-y-1 mb-4">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                {feature}
              </div>
            ))}
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Available Colors:</div>
            <div className="flex space-x-2">
              {colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gradient-to-br from-gray-200 to-gray-400"
                  title={color}
                ></div>
              ))}
              {colors.length > 4 && (
                <div className="text-xs text-gray-500 flex items-center">
                  +{colors.length - 4}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${price}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-lg text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          {originalPrice && originalPrice > price && (
            <div className="text-sm text-green-600 font-medium">
              Save ${originalPrice - price}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link
            href={`/${category}/${id}`}
            className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
              inStock
                ? 'text-white hover:opacity-90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={inStock ? { backgroundColor: '#8821f4' } : {}}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </Link>
          <Link
            href={`/${category}/${id}`}
            className="block w-full border border-gray-300 text-gray-700 text-center py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
} 