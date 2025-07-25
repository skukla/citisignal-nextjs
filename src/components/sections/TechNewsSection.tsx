'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import SectionContainer from '@/components/ui/SectionContainer';
import SectionHeader from '@/components/ui/SectionHeader';
import ArticleGrid from '@/components/ui/ArticleGrid';

export default function TechNewsSection() {
  const articles = [
    {
      category: '5G',
      readTime: '5 min read',
      title: 'Understanding 5G: The Future of Mobile Connectivity',
      excerpt: 'Learn how 5G technology is revolutionizing mobile communications and what it means for your daily digital experience.'
    },
    {
      category: 'Tips',
      readTime: '3 min read',
      title: 'Top 10 Ways to Extend Your Phone\'s Battery Life',
      excerpt: 'Simple yet effective strategies to make your smartphone battery last longer throughout the day.'
    },
    {
      category: 'Security',
      readTime: '4 min read',
      title: 'Essential Mobile Security Tips for 2024',
      excerpt: 'Protect your mobile device and personal data with these up-to-date security practices and recommendations.'
    }
  ];

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

      <ArticleGrid articles={articles} className="mb-8" />

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