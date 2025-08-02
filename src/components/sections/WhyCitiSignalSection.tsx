'use client';

import { memo } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
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
        {content.benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <IconComponent className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default memo(WhyCitiSignalSection); 