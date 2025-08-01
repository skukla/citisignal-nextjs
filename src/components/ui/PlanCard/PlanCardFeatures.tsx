'use client';

import { twMerge } from 'tailwind-merge';
import type { Plan } from '@/types/commerce';
import { formatNetworkPriority } from '@/lib/plan';

interface PlanCardFeaturesProps {
  plan: Plan;
  features: string[];
  className?: string;
}

/**
 * PlanCardFeatures component for displaying plan details, features, and streaming services.
 * Shows core plan allowances, additional details, and included features.
 */
export default function PlanCardFeatures({
  plan,
  features,
  className
}: PlanCardFeaturesProps) {
  return (
    <div className={twMerge('p-6 flex-grow flex flex-col', className)}>
      {/* Core Features Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center h-[52px]">
        <div className="flex flex-col justify-center">
          <div className="text-sm font-bold text-gray-900">{plan.data}</div>
          <div className="text-[11px] text-gray-600 mt-0.5">Data</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-sm font-bold text-gray-900">{plan.talk}</div>
          <div className="text-[11px] text-gray-600 mt-0.5">Talk</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-sm font-bold text-gray-900">{plan.text}</div>
          <div className="text-[11px] text-gray-600 mt-0.5">Text</div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-1.5 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Mobile Hotspot</span>
          <span className="text-gray-900">{plan.hotspot}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Network Priority</span>
          <span className="text-gray-900">{formatNetworkPriority(plan.network_priority)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Contract Required</span>
          <span className="text-gray-900">{plan.contract_required ? 'Yes' : 'No'}</span>
        </div>
      </div>

      {/* Included Features - Simple list for now, can be enhanced to use CheckmarkFeatureList later */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Included Features</h4>
        <ul className="space-y-1.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-gray-600">
              <svg 
                className="w-3.5 h-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
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
            {plan.streaming.map((service, index) => (
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