'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import BaseSection from '@/components/ui/layout/BaseSection';
import ArticleGrid from '@/components/ui/ArticleGrid';
import ArticleCard from '@/components/ui/ArticleCard';
import { techNewsArticles } from '@/data/articles';

export default function TechNewsSection() {
  return (
    <BaseSection
      bgColor="bg-gray-50"
      header={{
        title: "Latest Tech News & Insights",
        description: "Stay informed about the latest technology trends and get expert tips to enhance your mobile experience.",
        action: (
          <Button
            href="/blog"
            variant="secondary"
            rightIcon={ArrowRightIcon}
            className="w-full md:w-auto"
          >
            View All Articles
          </Button>
        )
      }}
    >
      <ArticleGrid columns={{ sm: 1, md: 3, lg: 3 }}>
        {techNewsArticles.map((article, index) => (
          <ArticleCard
            key={index}
            category={article.category}
            readTime={article.readTime}
            title={article.title}
            excerpt={article.excerpt}
            image={article.image}
            href={article.href || '/blog'}
          />
        ))}
      </ArticleGrid>
    </BaseSection>
  );
} 