'use client';

import { memo } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ArticleGrid from '@/components/ui/ArticleGrid';
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
          className="hidden md:flex items-center text-purple-600 hover:text-purple-700 font-medium"
        >
          View All Articles
          <ArrowRightIcon className="w-5 h-5 ml-2" />
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
          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
        >
          View All Articles
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </Section>
  );
}

export default memo(TechNewsSection); 