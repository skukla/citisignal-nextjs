'use client';

import { memo } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import IconBenefitCard from '@/components/ui/IconBenefitCard';
import { whyCitiSignalContent } from '@/data/sections/whyCitiSignal';
import type { WhyCitiSignalContent } from '@/data/sections/whyCitiSignal';

export interface WhyCitiSignalSectionProps {
  content?: WhyCitiSignalContent;
  className?: string;
}

function WhyCitiSignalSection({
  content = whyCitiSignalContent,
  className
}: WhyCitiSignalSectionProps) {
  return (
    <Section background="bg-gray-50" className={className}>
      <SectionHeader
        title={content.header.title}
        description={content.header.description}
        centered
        className="mb-12"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {content.benefits.map((benefit, index) => (
          <IconBenefitCard
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </Section>
  );
}

export default memo(WhyCitiSignalSection); 