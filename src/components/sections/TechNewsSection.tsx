'use client';

import { memo } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from '@/components/ui/foundations/Link';
import Section from '@/components/ui/layout/Section';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import ArticleGrid from '@/components/ui/grids/ArticleGrid';
import { techNewsContent } from '@/data/sections/techNews';
import type { TechNewsContent } from '@/data/sections/techNews';

export interface TechNewsSectionProps {
  content?: TechNewsContent;
  className?: string;
}

function TechNewsSection({
  content = techNewsContent,
  className
}: TechNewsSectionProps) {

  return (
    <Section background="bg-gray-50" className={className}>
      {/* Section Header with View All Link */}
      <div className="flex justify-between items-end mb-12">
        <SectionHeader
          title={content.header.title}
          description={content.header.description}
          className="mb-0"
        />
        <Link
          href={content.viewAllLink}
          variant="text"
          icon={ArrowRightIcon}
          iconPosition="right"
          className="hidden md:flex items-center text-purple-600 hover:text-purple-700 font-medium"
        >
          View All Articles
        </Link>
      </div>

      {/* Articles Grid */}
      <ArticleGrid 
        articles={content.articles}
        columns={{ sm: 1, md: 3 }}
        gap="lg"
        className="mb-8"
      />

      {/* Mobile View All Link */}
      <div className="md:hidden text-center">
        <Link
          href={content.viewAllLink}
          variant="text"
          icon={ArrowRightIcon}
          iconPosition="right"
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          View All Articles
        </Link>
      </div>
    </Section>
  );
}

export default memo(TechNewsSection); 