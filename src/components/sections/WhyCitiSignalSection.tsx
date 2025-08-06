'use client';

import { memo } from 'react';
import ContentSection from '@/components/ui/layout/ContentSection';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import IconBenefitGrid from '@/components/ui/grids/IconBenefitGrid';
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
    <ContentSection background="bg-gray-50" className={className}>
      <SectionHeader
        title={content.header.title}
        description={content.header.description}
        centered
        className="mb-12"
      />
      
      <IconBenefitGrid 
        benefits={content.benefits}
        columns={{ sm: 1, md: 2, lg: 4 }}
        gap="lg"
      />
    </ContentSection>
  );
}

export default memo(WhyCitiSignalSection); 