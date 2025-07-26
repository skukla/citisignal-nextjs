'use client';

import BaseSection from '@/components/ui/layout/BaseSection';
import BaseGrid from '@/components/ui/layout/BaseGrid';
import StatsCard from '@/components/ui/StatsCard';
import ProgressBar from '@/components/ui/ProgressBar';
import StatsList from '@/components/ui/StatsList';
import { coverageStats, networkStats, coverageIcon, networkIcon } from '@/data/coverage';

export default function CoverageSection() {
  return (
    <BaseSection
      header={{
        title: "Network Coverage",
        description: "Experience our nationwide 5G network coverage",
        centered: true
      }}
    >
      <BaseGrid columns={{ sm: 1, md: 2 }} gap="lg">
        {/* Coverage Stats */}
        <StatsCard
          icon={coverageIcon}
          title="5G Coverage"
        >
          <div className="space-y-4">
            {coverageStats.map((stat, index) => (
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
          icon={networkIcon}
          title="Network Stats"
        >
          <StatsList items={networkStats} />
        </StatsCard>
      </BaseGrid>
    </BaseSection>
  );
} 