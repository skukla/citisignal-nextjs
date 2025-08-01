'use client';

import { CheckIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';

interface PlanCardFeaturesProps {
  data: string;
  talk: string;
  text: string;
  hotspot: string;
  networkPriority: string;
  contractRequired: boolean;
  features: string[];
  streaming: string[];
  className?: string;
}

/**
 * PlanCardFeatures component for displaying plan details, features, and streaming services.
 * Shows core plan allowances, additional details, and included features.
 */
export default function PlanCardFeatures({
  data,
  talk,
  text,
  hotspot,
  networkPriority,
  contractRequired,
  features,
  streaming,
  className
}: PlanCardFeaturesProps) {
  return (
    <div className={twMerge('p-6 flex-grow flex flex-col', className)}>
      {/* Core Features Grid */}
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

      {/* Included Features */}
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
      </div>
    </div>
  );
}