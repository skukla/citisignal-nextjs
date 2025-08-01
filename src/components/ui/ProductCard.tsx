'use client';

/**
 * @deprecated This ProductCard component is deprecated. 
 * Use the refactored ProductCard from '@/features/product/components/ProductCard' instead.
 * 
 * New usage:
 * ```tsx
 * import { ProductCard } from '@/features/product/components/ProductCard';
 * 
 * <ProductCard product={productData}>
 *   <ProductCard.Image />
 *   <ProductCard.Info />
 *   <ProductCard.Price />
 *   <ProductCard.Actions />
 * </ProductCard>
 * ```
 */

import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
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
  // Deprecation warning
  console.warn(
    'ProductCard from @/components/ui/ProductCard is deprecated. ' +
    'Use the refactored ProductCard from @/features/product/components/ProductCard instead.'
  );

  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 group">
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
          className="absolute top-8 right-8 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
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
        
        {/* Storage */}
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
    </div>
  );
} 