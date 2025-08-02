'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { techNewsContent } from '@/data/sections/techNews';
import type { TechNewsContent } from '@/data/sections/techNews';

export interface TechNewsSectionProps {
  content?: TechNewsContent;
  className?: string;
}

export default function TechNewsSection({
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {content.articles.map((article, index) => (
          <article key={article.slug || index} className="group cursor-pointer">
            {/* Article Image */}
            <div className="aspect-video bg-purple-50 rounded-xl mb-4 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                <span className="text-purple-600 font-medium">Article Image</span>
              </div>
            </div>

            {/* Article Content */}
            <div>
              <div className="text-sm font-medium text-purple-600 mb-2">
                {article.category} • {article.readTime}
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600">
                {article.excerpt}
              </p>
            </div>
          </article>
          ))}
        </div>

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