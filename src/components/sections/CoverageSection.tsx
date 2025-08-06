'use client';

import { memo } from 'react';
import { SignalIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import ContentSection from '@/components/ui/layout/ContentSection';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import StatsCard from '@/components/ui/cards/StatsCard';
import ProgressBar from '@/components/ui/content/ProgressBar';
import StatsList from '@/components/ui/content/StatsList';
import { coverageContent } from '@/data/sections/coverage';
import type { CoverageSectionProps } from '@/types/section';

function CoverageSection({
  content = coverageContent,
  className
}: CoverageSectionProps) {

  return (
    <ContentSection background="bg-white" className={className}>
      <SectionHeader
        title={content.header.title}
        description={content.header.description}
        centered
        className="mb-12"
      />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coverage Stats */}
          <StatsCard
            icon={SignalIcon}
            title="5G Coverage"
          >
            <div className="space-y-4">
              {content.coverageStats.map((stat, index) => (
                <ProgressBar
                  key={index}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </StatsCard>

          {/* Network Stats */}
          <StatsCard
            icon={GlobeAmericasIcon}
            title="Network Stats"
          >
            <StatsList items={content.networkStats} />
          </StatsCard>
        </div>
    </ContentSection>
  );
}

export default memo(CoverageSection); 