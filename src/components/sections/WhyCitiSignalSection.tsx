'use client';

import BaseSection from '@/components/ui/layout/BaseSection';
import FeatureGrid from '@/components/ui/FeatureGrid';
import FeatureCard from '@/components/ui/FeatureCard';
import { whyCitiSignalFeatures } from '@/data/features';

export default function WhyCitiSignalSection() {
  return (
    <BaseSection
      bgColor="bg-gray-50"
      header={{
        title: "Why Choose CitiSignal",
        description: "Experience the difference with our industry-leading service",
        centered: true
      }}
    >
      <FeatureGrid>
        {whyCitiSignalFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </FeatureGrid>
    </BaseSection>
  );
} 