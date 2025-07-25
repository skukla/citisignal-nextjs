'use client';

import { useState } from 'react';
import { StarIcon, CheckIcon, HeartIcon } from '@heroicons/react/24/solid';
import Button from './Button';

interface PlanCardProps {
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
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
  name,
  type,
  price,
  originalPrice,
  rating,
  reviews,
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

  return (
    <div className={`bg-white border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 relative h-full flex flex-col ${
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
        <div className="h-[100px] flex flex-col mb-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm text-gray-600 capitalize">{type} Plan</p>
                {isNew && (
                  <span className="bg-green-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                    NEW
                  </span>
                )}
                {isSale && originalPrice && (
                  <span className="bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                    {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-1 hover:bg-gray-50 rounded-full transition-colors flex-shrink-0"
            >
              <HeartIcon className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>

        {/* Pricing */}
        <div className="h-[48px] mb-6 flex flex-col justify-end">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">${price}</span>
            <span className="text-gray-600 ml-1">/month</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating / 20) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {(rating / 20).toFixed(1)} ({reviews} reviews)
          </span>
        </div>
      </div>

      {/* Plan Details */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Core Features */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center h-[52px]">
          <div className="flex flex-col justify-center">
            <div className="text-sm font-bold text-gray-900">{data}</div>
            <div className="text-[11px] text-gray-600 mt-0.5">Data</div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-sm font-bold text-gray-900">{talk}</div>
            <div className="text-[11px] text-gray-600 mt-0.5">Talk</div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-sm font-bold text-gray-900">{text}</div>
            <div className="text-[11px] text-gray-600 mt-0.5">Text</div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-1.5 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Mobile Hotspot</span>
            <span className="text-gray-900">{hotspot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Network Priority</span>
            <span className="text-gray-900 capitalize">{networkPriority}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Contract Required</span>
            <span className="text-gray-900">{contractRequired ? 'Yes' : 'No'}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Included Features</h4>
          <ul className="space-y-1.5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <CheckIcon className="w-3.5 h-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                <span className="leading-5">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Streaming Services */}
        <div className="mt-auto">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Streaming Included</h4>
            <div className="flex flex-wrap gap-1">
              {streaming.map((service, index) => (
                <span
                  key={index}
                  className="bg-purple-50 text-purple-700 text-[11px] font-medium px-1.5 py-0.5 rounded"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 mt-8">
            <Button
              variant="primary"
              fullWidth
              size="md"
            >
              Select Plan
            </Button>
            <Button
              variant="outline"
              fullWidth
              size="md"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 