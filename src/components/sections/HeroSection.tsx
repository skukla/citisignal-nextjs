'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import GradientSection from '@/components/ui/GradientSection';
import PromoTag from '@/components/ui/PromoTag';
import FeatureList from '@/components/ui/FeatureList';
import PhoneMockup from '@/components/ui/PhoneMockup';
import SimplePlanCard from '@/components/ui/SimplePlanCard';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  const features = [
    {
      highlight: 'Max coverage, Super speed.',
      details: 'Our prepaid plans use the same great CitiSignal 5G network that covers more than 200 million Americans nationwide.'
    }
  ];

  return (
    <GradientSection>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          <PromoTag
            text="Our lowest-priced plans ever"
            className="mb-6"
          />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-yellow-300">Starting at only</span>
            <br />
            <span className="text-5xl md:text-6xl lg:text-7xl">$10/month</span>
          </h1>

          <p className="text-xl text-purple-100 mb-8 max-w-md">
            Unlimited talk and text, plus 2.5GB of high-speed data. 
            And we&apos;ll increase your data by 500MB each year through 2025.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              href="/plans"
              variant="yellow"
              rightIcon={ArrowRightIcon}
            >
              Shop Plans
            </Button>
            <Button
              href="/phones"
              variant="white-outline"
            >
              Shop Phones
            </Button>
          </div>

          {/* Features */}
          <div className="text-sm text-purple-100 mb-4">
            Plus taxes & fees. Domestic use only.
          </div>
          
          <FeatureList features={features} />
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                <PhoneMockup />
                <SimplePlanCard
                  price="$10/month"
                  title="Unlimited Talk & Text"
                  subtitle="+ 2.5GB High-Speed Data"
                />
              </div>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
        </div>
      </div>
    </GradientSection>
  );
} 