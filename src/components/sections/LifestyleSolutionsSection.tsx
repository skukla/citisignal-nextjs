'use client';

import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import SolutionGrid from '@/components/ui/SolutionGrid';
import Link from '@/components/ui/Link';
import { lifestyleSolutionsContent } from '@/data/sections/lifestyleSolutions';
import type { LifestyleSolutionsContent } from '@/data/sections/lifestyleSolutions';

export interface LifestyleSolutionsSectionProps {
  content?: LifestyleSolutionsContent;
  className?: string;
}

export default function LifestyleSolutionsSection({
  content = lifestyleSolutionsContent,
  className
}: LifestyleSolutionsSectionProps) {


  return (
    <Section background="bg-gray-50" className={className}>
      <SectionHeader
        title={content.header.title}
        description={content.header.description}
        centered
        className="mb-16"
      />

      <SolutionGrid solutions={content.solutions} />

      <div className="mt-16 text-center">
        <Link
          href="/solutions"
          variant="button"
          buttonStyle="primary"
          className="px-8 py-4 text-lg"
        >
          Find Your Perfect Solution
        </Link>
      </div>
    </Section>
  );
} 