'use client';

import BaseSection from '@/components/ui/layout/BaseSection';
import SolutionGrid from '@/components/ui/SolutionGrid';
import SolutionCard from '@/components/ui/SolutionCard';
import Button from '@/components/ui/Button';
import { lifestyleSolutions } from '@/data/solutions';

export default function LifestyleSolutionsSection() {
  return (
    <BaseSection
      bgColor="bg-gray-50"
      header={{
        title: "Solutions for Every Lifestyle",
        description: "Discover tailored mobile solutions designed to fit your unique lifestyle and needs.",
        centered: true
      }}
      footer={
        <div className="text-center">
          <Button
            href="/solutions"
            variant="primary"
            size="lg"
          >
            Find Your Perfect Solution
          </Button>
        </div>
      }
    >
      <SolutionGrid>
        {lifestyleSolutions.map((solution, index) => (
          <SolutionCard
            key={index}
            icon={solution.icon}
            title={solution.title}
            description={solution.description}
            features={solution.features}
            href={solution.link}
          />
        ))}
      </SolutionGrid>
    </BaseSection>
  );
} 