'use client';

import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import clsx from 'clsx';
import ProductBadge from './ProductBadge';
import ProductImagePlaceholder from './ProductImagePlaceholder';

interface ProductCardProps {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  features?: string[];
  colors?: {
    name: string;
    hex: string;
  }[];
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
  image,
  category,
  features = [],
  colors = [],
  inStock = true,
  isNew = false,
  isSale = false
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="card group hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative p-6">
        <ProductImagePlaceholder 
          image={image ? { url: image, label: name } : undefined}
          category={category}
        />
        
        {/* Badges */}
        <div className="absolute top-8 left-8 flex flex-col gap-1">
          {isNew && <ProductBadge variant="new" />}
          {isSale && originalPrice && originalPrice > price && (
            <ProductBadge 
              variant="discount" 
              originalPrice={originalPrice} 
              price={price} 
            />
          )}
          {!inStock && <ProductBadge variant="out-of-stock" />}
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={clsx(
            'icon-button absolute top-8 right-8',
            isWishlisted && 'text-red-500'
          )}
        >
          {isWishlisted ? (
            <HeartIcon className="w-4 h-4" />
          ) : (
            <HeartOutlineIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="px-6 pb-6">
        <div className="text-sm text-gray-500 mb-1">{brand}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {name}
        </h3>
        
        {/* Features */}
        {features.length > 0 && (
          <div className="text-sm text-gray-600 mb-4 truncate">
            {features.join(', ')}
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Available Colors:</div>
            <div className="flex flex-wrap gap-2">
              {colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {colors.length > 4 && (
                <div className="w-6 h-6 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-500 font-medium">
                  +{colors.length - 4}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pricing and Buttons Container */}
        <div className="mt-auto">
          {/* Pricing */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${price}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-lg text-gray-500 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Link
              href={`/${category}/${id}`}
              className={clsx(
                'btn w-full',
                inStock ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              )}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </Link>
            <Link
              href={`/${category}/${id}`}
              className="btn btn-secondary w-full"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 