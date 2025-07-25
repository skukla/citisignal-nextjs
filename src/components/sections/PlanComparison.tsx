'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ContentSection from '../ui/ContentSection';

interface PlanType {
  name: string;
  id: string;
}

interface PlanFeature {
  name: string;
  description: string;
  availableIn: string[];
}

interface PlanComparisonProps {
  title?: string;
  description?: string;
  planTypes: PlanType[];
  features: PlanFeature[];
  className?: string;
}

export default function PlanComparison({
  title = "Compare Plan Features",
  description = "Find the perfect plan for your needs. All plans include nationwide coverage on our reliable network.",
  planTypes,
  features,
  className
}: PlanComparisonProps) {
  return (
    <ContentSection
      title={title}
      description={description}
      className={className}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 min-w-[280px]">Feature</th>
              {planTypes.map((planType) => (
                <th
                  key={planType.id}
                  className="py-4 px-6 text-center text-sm font-semibold text-gray-900 min-w-[140px]"
                >
                  {planType.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {features.map((feature) => (
              <tr key={feature.name} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                  <div className="text-sm text-gray-500">{feature.description}</div>
                </td>
                {planTypes.map((planType) => (
                  <td key={planType.id} className="py-4 px-6 text-center">
                    {feature.availableIn.includes(planType.id) ? (
                      <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <XMarkIcon className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ContentSection>
  );
} 