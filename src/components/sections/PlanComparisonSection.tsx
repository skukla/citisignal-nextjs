'use client';

import BaseSection from '@/components/ui/layout/BaseSection';
import ComparisonTable, { ComparisonHeader } from '@/components/ui/ComparisonTable';
import ComparisonRow from '@/components/ui/ComparisonRow';

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
  const headers: ComparisonHeader[] = [
    { label: 'Feature', width: 280, align: 'left' },
    ...planTypes.map(type => ({
      label: type.name,
      width: 140,
      align: 'center' as const
    }))
  ];

  return (
    <BaseSection
      header={{
        title,
        description,
        centered: true
      }}
      className={className}
    >
      <ComparisonTable headers={headers}>
        {features.map((feature) => (
          <ComparisonRow
            key={feature.name}
            title={feature.name}
            description={feature.description}
            values={planTypes.map(type => feature.availableIn.includes(type.id))}
          />
        ))}
      </ComparisonTable>
    </BaseSection>
  );
} 