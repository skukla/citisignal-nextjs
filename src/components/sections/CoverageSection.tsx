'use client';

import { SignalIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import StatsCard from '@/components/ui/StatsCard';
import ProgressBar from '@/components/ui/ProgressBar';
import StatsList from '@/components/ui/StatsList';
import { coverageContent } from '@/data/sections/coverage';
import type { CoverageSectionProps } from '@/types/section';

export default function CoverageSection({
  content = coverageContent,
  className
}: CoverageSectionProps) {

  return (
    <Section background="bg-white" className={className}>
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
    </Section>
  );
} 