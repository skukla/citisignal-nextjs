'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StarIcon, CheckIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';

interface PlanCardProps {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  data: string;
  talk: string;
  text: string;
  features: string[];
  hotspot: string;
  streaming: string[];
  isPopular: boolean;
  isNew: boolean;
  isSale: boolean;
  contractRequired: boolean;
  networkPriority: string;
}

export default function PlanCard({
  id,
  name,
  type,
  price,
  originalPrice,
  rating,
  reviews,
  category,
  data,
  talk,
  text,
  features,
  hotspot,
  streaming,
  isPopular,
  isNew,
  isSale,
  contractRequired,
  networkPriority
}: PlanCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className={`bg-white border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 relative ${
      isPopular ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20' : 'border-gray-200'
    }`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="text-white text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#8821f4' }}>
            MOST POPULAR
          </span>
        </div>
      )}

      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 capitalize">{type} Plan</span>
              {isNew && (
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                  NEW
                </span>
              )}
              {isSale && discount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <HeartIcon className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-gray-900">
              ${price}
            </span>
            <span className="text-gray-600">/month</span>
            {originalPrice && originalPrice > price && (
              <span className="text-lg text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          {originalPrice && originalPrice > price && (
            <div className="text-sm text-green-600 font-medium">
              Save ${originalPrice - price}/month
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center">
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
            {rating} ({reviews} reviews)
          </span>
        </div>
      </div>

      {/* Plan Details */}
      <div className="p-6">
        {/* Core Features */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">{data}</div>
            <div className="text-sm text-gray-600">Data</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{talk}</div>
            <div className="text-sm text-gray-600">Talk</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{text}</div>
            <div className="text-sm text-gray-600">Text</div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Mobile Hotspot</span>
            <span className="font-medium text-gray-900">{hotspot}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Network Priority</span>
            <span className="font-medium text-gray-900 capitalize">{networkPriority}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Contract Required</span>
            <span className="font-medium text-gray-900">{contractRequired ? 'Yes' : 'No'}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Included Features</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Streaming Services */}
        {streaming.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Streaming Included</h4>
            <div className="flex flex-wrap gap-2">
              {streaming.map((service, index) => (
                <span
                  key={index}
                  className="bg-purple-50 text-purple-700 text-xs font-medium px-2 py-1 rounded"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/plans/${id}`}
            className="block w-full text-white text-center py-3 rounded-lg hover:opacity-90 transition-all font-medium"
            style={{ backgroundColor: '#8821f4' }}
          >
            Select Plan
          </Link>
          <Link
            href={`/plans/${id}`}
            className="block w-full border border-gray-300 text-gray-700 text-center py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
} 