'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import SectionContainer from '@/components/ui/SectionContainer';
import SectionHeader from '@/components/ui/SectionHeader';
import ArticleGrid from '@/components/ui/ArticleGrid';
import { techNewsArticles } from '@/data/articles';

export default function TechNewsSection() {
  return (
    <SectionContainer bgColor="bg-gray-50">
      <SectionHeader
        title="Latest Tech News & Insights"
        description="Stay informed about the latest technology trends and get expert tips to enhance your mobile experience."
        action={
          <Button
            href="/blog"
            variant="secondary"
            rightIcon={ArrowRightIcon}
            className="hidden md:inline-flex"
          >
            View All Articles
          </Button>
        }
        className="mb-12"
      />

      <ArticleGrid 
        articles={techNewsArticles} 
        columns={{ sm: 1, md: 3, lg: 3 }}
        className="mb-8" 
      />

      <div className="md:hidden text-center">
        <Button
          href="/blog"
          variant="secondary"
          rightIcon={ArrowRightIcon}
        >
          View All Articles
        </Button>
      </div>
    </SectionContainer>
  );
} 