'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from '@/components/ui/Link';
import Section from '@/components/ui/Section';
import PromoTag from '@/components/ui/PromoTag';
import FeatureList from '@/components/ui/FeatureList';
import PhoneMockup from '@/components/ui/PhoneMockup';
import SimplePlanCard from '@/components/ui/SimplePlanCard';
import { heroContent } from '@/data/sections/hero';
import type { HeroSectionProps } from '@/types/section';

export default function HeroSection({
  content = heroContent,
  className
}: HeroSectionProps) {
  return (
    <Section 
      className={`bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white ${className || ''}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          {content.promotional && (
            <PromoTag
              text={content.promotional}
              className="mb-6"
            />
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-yellow-300">{content.headline.prefix}</span>
            <br />
            <span className="text-5xl md:text-6xl lg:text-7xl">{content.headline.amount}</span>
          </h1>

          <p className="text-xl text-purple-100 mb-8 max-w-md">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href={content.primaryCTA.href}
              variant="button"
              buttonStyle="primary"
              icon={ArrowRightIcon}
              iconPosition="right"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-8 py-4"
            >
              {content.primaryCTA.text}
            </Link>
            <Link
              href={content.secondaryCTA.href}
              variant="button"
              buttonStyle="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4"
            >
              {content.secondaryCTA.text}
            </Link>
          </div>

          {/* Features */}
          <div className="text-sm text-purple-100 mb-4">
            {content.disclaimer}
          </div>
          
          <FeatureList features={[content.feature]} />
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                <PhoneMockup />
                <SimplePlanCard
                  price={content.planPreview.price}
                  title={content.planPreview.title}
                  subtitle={content.planPreview.subtitle}
                />
              </div>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
        </div>
      </div>
    </Section>
  );
} 