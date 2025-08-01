'use client';

import { MapPinIcon, SignalIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import Container from '@/components/ui/Container';
import StatsCard from '@/components/ui/StatsCard';
import ProgressBar from '@/components/ui/ProgressBar';
import StatsList from '@/components/ui/StatsList';

export default function CoverageSection() {
  const coverageStats = [
    { label: 'Population Coverage', value: 99 },
    { label: 'Geographic Coverage', value: 92 }
  ];

  const networkStats = [
    { icon: MapPinIcon, text: '450,000+ Cell Towers' },
    { icon: MapPinIcon, text: '98% 4G LTE Coverage' },
    { icon: MapPinIcon, text: 'Expanding 5G Ultra Capacity' }
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Network Coverage</h2>
          <p className="text-lg text-gray-600">Experience our nationwide 5G network coverage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coverage Stats */}
          <StatsCard
            icon={SignalIcon}
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
            icon={GlobeAmericasIcon}
            title="Network Stats"
          >
            <StatsList items={networkStats} />
          </StatsCard>
        </div>
      </Container>
    </section>
  );
} 